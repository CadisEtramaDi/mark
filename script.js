/**
 * EKD (Encourage Kingdom Date) - Architectural Transmittal Scripts
 * Handles the structural envelope opening, 3D unsealing, sound synthesis, and letter interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const architectEnvelope = document.getElementById('architectEnvelope');
  const sealOpenBtn = document.getElementById('sealOpenBtn');
  const envelopeRecipientDisplay = document.getElementById('envelopeRecipientDisplay');
  const displayRecipientName = document.getElementById('displayRecipientName');
  const recipientSigDisplay = document.getElementById('recipientSigDisplay');
  const returnToEnvelopeBtn = document.getElementById('returnToEnvelopeBtn');
  const printSheetBtn = document.getElementById('printSheetBtn');
  const blueprintSheet = document.getElementById('blueprintSheet');
  
  const acceptRsvpBtn = document.getElementById('acceptRsvpBtn');
  const declineRsvpBtn = document.getElementById('declineRsvpBtn');
  const architectSeal = document.getElementById('architectSeal');
  const sealTimestamp = document.getElementById('sealTimestamp');
  
  const currentDateDisplay = document.getElementById('currentDateDisplay');
  const titleBlockDate = document.getElementById('titleBlockDate');
  
  const rsvpModal = document.getElementById('rsvpModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalGuestName = document.getElementById('modalGuestName');
  const receiptHeading = document.getElementById('receiptHeading');
  const receiptMessage = document.getElementById('receiptMessage');
  const transmittalId = document.getElementById('transmittalId');

  // Format today's architectural date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;
  
  if (currentDateDisplay) currentDateDisplay.textContent = formattedDate;
  if (titleBlockDate) titleBlockDate.textContent = formattedDate;

  // 1. Live Sync Recipient Name across Envelope and Drawing Sheet
  function syncRecipientName(newName, sourceElement) {
    let cleanName = newName.replace(/^For\s+/i, '').trim();
    if (!cleanName) cleanName = 'Lith';

    if (sourceElement !== envelopeRecipientDisplay && envelopeRecipientDisplay) {
      envelopeRecipientDisplay.textContent = `For ${cleanName}`;
    }
    if (sourceElement !== displayRecipientName && displayRecipientName) {
      displayRecipientName.textContent = cleanName;
    }
    if (sourceElement !== recipientSigDisplay && recipientSigDisplay) {
      recipientSigDisplay.textContent = cleanName;
    }
    if (modalGuestName) {
      modalGuestName.textContent = cleanName;
    }
  }

  // Allow clicking directly on the envelope or letter name to edit
  if (envelopeRecipientDisplay) {
    envelopeRecipientDisplay.addEventListener('input', (e) => {
      syncRecipientName(e.target.innerText, envelopeRecipientDisplay);
    });
    envelopeRecipientDisplay.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent opening envelope when clicking to edit name
    });
  }

  if (displayRecipientName) {
    displayRecipientName.addEventListener('input', (e) => {
      syncRecipientName(e.target.innerText, displayRecipientName);
    });
  }

  if (recipientSigDisplay) {
    recipientSigDisplay.addEventListener('input', (e) => {
      syncRecipientName(e.target.innerText, recipientSigDisplay);
    });
  }

  // 2. Synthesized Sound Effects (No external files required)
  function playUnsealSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Metallic unlatch click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.13);

      // Paper slide swish
      const bufferSize = audioCtx.sampleRate * 0.25;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.08);
      filter.frequency.linearRampToValueAtTime(400, audioCtx.currentTime + 0.25);
      
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.08);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  function playStampImpact() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Deep mechanical impact
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(28, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.22);

      // Paper click
      const bufferSize = audioCtx.sampleRate * 0.05;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      noise.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start();
    } catch (e) {}
  }

  function playDraftingClick() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  // 3. Open Envelope Action (3D Unfolding & Slide)
  function openEnvelope() {
    playUnsealSound();
    body.classList.remove('envelope-closed');
    body.classList.add('envelope-opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeEnvelope() {
    playDraftingClick();
    body.classList.remove('envelope-opened');
    body.classList.add('envelope-closed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (sealOpenBtn) {
    sealOpenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (architectEnvelope) {
    architectEnvelope.addEventListener('click', () => {
      openEnvelope();
    });
  }

  if (returnToEnvelopeBtn) {
    returnToEnvelopeBtn.addEventListener('click', () => {
      closeEnvelope();
    });
  }

  if (printSheetBtn) {
    printSheetBtn.addEventListener('click', () => {
      playDraftingClick();
      window.print();
    });
  }

  // 4. RSVP Modal Actions
  function openModal(isAccepted) {
    const randomTransmittalCode = 'EKD-' + Math.floor(1000 + Math.random() * 9000) + '-OK';
    if (transmittalId) transmittalId.textContent = randomTransmittalCode;

    const guestName = (recipientSigDisplay ? recipientSigDisplay.textContent.trim() : (envelopeRecipientDisplay ? envelopeRecipientDisplay.textContent.replace(/^For\s+/i, '').trim() : 'Lith'));

    if (isAccepted) {
      if (receiptHeading) receiptHeading.textContent = 'CONSTRUCTION ORDER CONFIRMED!';
      if (receiptMessage) {
        receiptMessage.innerHTML = `Thank you, <strong id="modalGuestName">${guestName}</strong>. Your place at the <strong>Encourage Kingdom Date</strong> has been firmly drafted into the master schedule.`;
      }
    } else {
      if (receiptHeading) receiptHeading.textContent = 'TRANSMITTAL ACKNOWLEDGED';
      if (receiptMessage) {
        receiptMessage.innerHTML = `We understand you are unable to attend, <strong id="modalGuestName">${guestName}</strong>. You remain lifted in prayer and firmly rooted in our brotherhood. May God richly bless and sustain you.`;
      }
    }

    if (rsvpModal) {
      rsvpModal.classList.add('active');
      rsvpModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    playDraftingClick();
    if (rsvpModal) {
      rsvpModal.classList.remove('active');
      rsvpModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // 5. Accept Attendance & Apply Rubber Stamp
  if (acceptRsvpBtn) {
    acceptRsvpBtn.addEventListener('click', () => {
      playStampImpact();
      if (sealTimestamp) sealTimestamp.textContent = formattedDate;
      if (architectSeal) {
        architectSeal.classList.remove('stamped');
        void architectSeal.offsetWidth; // Force reflow
        architectSeal.classList.add('stamped');
      }

      setTimeout(() => {
        openModal(true);
      }, 450);
    });
  }

  if (declineRsvpBtn) {
    declineRsvpBtn.addEventListener('click', () => {
      playDraftingClick();
      openModal(false);
    });
  }
});
