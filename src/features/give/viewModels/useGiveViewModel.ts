import { useState, useEffect } from 'react';

// Model types
export interface DonationAmount {
  value: number;
  currency: string;
}

export interface LineItem {
  name: string;
  quantity: number;
  amount: DonationAmount;
}

export interface DonationMetadata {
  type: string;
  churchId: string;
}

export interface DonationPayload {
  description: string;
  lineItems: LineItem[];
  metadata: DonationMetadata;
}

export interface ModalContent {
  title: string;
  description: string;
  color: string;
  type: string;
  churchId: string;
}

// Modal data model
export const MODAL_DATA: Record<'church' | 'coffee', ModalContent> = {
  church: {
    title: "Church Tithing & Offering",
    description: "Fill out the details below to process your donation securely.",
    color: "from-gold to-gold-light",
    type: "church_donation",
    churchId: "1",
  },
  coffee: {
    title: "Fuel the AlphaExplora Team",
    description: "Support the developers behind the TMGN digital experience.",
    color: "from-purple-500 to-purple-600",
    type: "tech_donation",
    churchId: "0",
  }
};

// ViewModel
export const useGiveViewModel = () => {
  // State
  const [activeModal, setActiveModal] = useState<'church' | 'coffee' | null>(null);
  const [expandedCard, setExpandedCard] = useState<'church' | 'coffee'>('church');
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState<string>('');
  const [itemName, setItemName] = useState<string>('Tithes');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      resetForm();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  // Private methods
  const resetForm = (): void => {
    setAmount(null);
    setDescription('');
    setItemName('Tithes');
  };

  const buildDonationPayload = (modalType: 'church' | 'coffee'): DonationPayload => {
    const modalContent = MODAL_DATA[modalType];
    return {
      description: description,
      lineItems: [
        {
          name: itemName,
          quantity: 1,
          amount: {
            value: amount! * 100, // Convert PHP to cents
            currency: "PHP"
          }
        }
      ],
      metadata: {
        type: modalContent.type,
        churchId: modalContent.churchId
      }
    };
  };

  const isFormValid = (): boolean => {
    return !(!amount || !description || !itemName);
  };

  // Public methods
  const handleDonationSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill out all fields and select an amount.');
      return;
    }

    if (!activeModal) return;

    setIsLoading(true);
    try {
      const payload = buildDonationPayload(activeModal);

      const response = await fetch('http://localhost:4000/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const data = await response.json();
      const redirectUrl = data?.session?.data?.redirectUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert('Payment processed successfully. Thank you for your generosity!');
        closeModal();
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('An error occurred while initiating the payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (modalType: 'church' | 'coffee'): void => {
    setActiveModal(modalType);
  };

  const closeModal = (): void => {
    setActiveModal(null);
  };

  const setCardExpanded = (card: 'church' | 'coffee'): void => {
    setExpandedCard(card);
  };

  const getCurrentModalContent = (): ModalContent | null => {
    return activeModal ? MODAL_DATA[activeModal] : null;
  };

  // Return public interface
  return {
    // State
    activeModal,
    expandedCard,
    amount,
    description,
    itemName,
    isLoading,
    // State setters
    setAmount,
    setDescription,
    setItemName,
    // Methods
    handleDonationSubmit,
    openModal,
    closeModal,
    setCardExpanded,
    getCurrentModalContent,
    isFormValid,
    // Data
    modalData: MODAL_DATA,
  };
};

export type GiveViewModelType = ReturnType<typeof useGiveViewModel>;
