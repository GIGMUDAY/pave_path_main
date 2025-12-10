import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface CallFormData {
  name: string;
  firm: string;
  role: string;
  email: string;
  phone: string;
  draftingSupport: string[];
  otherService: string;
  message: string;
}

export interface RedlineFormData {
  name: string;
  email: string;
  deadline: string;
  description: string;
}

/**
 * Save a call request form submission to Firestore
 */
export const saveCallRequest = async (formData: CallFormData): Promise<void> => {
  try {
    await addDoc(collection(db, 'callRequests'), {
      ...formData,
      type: 'call',
      createdAt: serverTimestamp(),
      status: 'new',
    });
  } catch (error) {
    console.error('Error saving call request:', error);
    throw error;
  }
};

/**
 * Save a redline task form submission to Firestore
 */
export const saveRedlineRequest = async (formData: RedlineFormData): Promise<void> => {
  try {
    await addDoc(collection(db, 'redlineRequests'), {
      ...formData,
      type: 'redline',
      createdAt: serverTimestamp(),
      status: 'new',
    });
  } catch (error) {
    console.error('Error saving redline request:', error);
    throw error;
  }
};

