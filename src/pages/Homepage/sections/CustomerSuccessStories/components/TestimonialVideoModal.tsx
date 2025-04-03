
import { useEffect } from 'react';
import ModalVideo from 'react-modal-video';

interface TestimonialVideoModalProps {
  isOpen: boolean;
  videoId: string;
  onClose: () => void;
}

/**
 * TestimonialVideoModal - Displays video testimonials in a modal
 */
export const TestimonialVideoModal = ({ 
  isOpen, 
  videoId, 
  onClose 
}: TestimonialVideoModalProps) => {
  // Focus trap functionality for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent page scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <ModalVideo
      channel="youtube"
      isOpen={isOpen}
      videoId={videoId}
      onClose={onClose}
      aria={{
        openMessage: 'You are now viewing a video testimonial',
        dismissBtnMessage: 'Close the video'
      }}
    />
  );
};
