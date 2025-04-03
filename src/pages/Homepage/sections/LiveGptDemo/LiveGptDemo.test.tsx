
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LiveGptDemo from './LiveGptDemo';

describe('LiveGptDemo', () => {
  test('renders the section title', () => {
    render(<LiveGptDemo />);
    expect(screen.getByText('Experience SalesWhisper in Action')).toBeInTheDocument();
  });

  test('displays the transcript player', () => {
    render(<LiveGptDemo />);
    expect(screen.getByText('Sales Conversation')).toBeInTheDocument();
  });

  test('shows play button in audio controls', () => {
    render(<LiveGptDemo />);
    const playButton = screen.getByLabelText('Play');
    expect(playButton).toBeInTheDocument();
  });

  test('toggles between views on mobile', () => {
    // Mock window resize to mobile
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));
    
    render(<LiveGptDemo />);
    
    // Should start with transcript view on mobile
    expect(screen.getByText('Sales Conversation')).toBeInTheDocument();
    
    // Click view toggle button
    const toggleButton = screen.getByText('View Analysis');
    fireEvent.click(toggleButton);
    
    // Should now show analysis view
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
  });

  test('opens the try demo modal when CTA is clicked', () => {
    render(<LiveGptDemo />);
    
    const ctaButton = screen.getByText('Try with your own data');
    fireEvent.click(ctaButton);
    
    // Modal should be visible
    expect(screen.getByText('Try SalesWhisper with your data')).toBeInTheDocument();
  });

  test('plays and pauses the demo', () => {
    render(<LiveGptDemo />);
    
    // Initially paused
    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);
    
    // Should now be playing and show a pause button
    const pauseButton = screen.getByLabelText('Pause');
    expect(pauseButton).toBeInTheDocument();
    
    // Click to pause
    fireEvent.click(pauseButton);
    
    // Should show play button again
    expect(screen.getByLabelText('Play')).toBeInTheDocument();
  });
});
