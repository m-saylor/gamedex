import React, { useState } from 'react';
import { IconButton, Fade } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

function JumpToTop() {
  // state
  const [visible, setVisible] = useState(false);

  // toggle visibility of the button
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // detect user scroll
  window.addEventListener('scroll', toggleVisible);

  return (
    <div style={{ bottom: '5px', left: '96%', position: 'sticky' }}>
      <Fade in={visible}>
        <IconButton
          aria-label="Jump to top"
          borderRadius="6px"
          bottom={5}
          icon={<ArrowUpIcon />}
          left="96%"
          mb="20px"
          position="sticky"
          variant="solidPink"
          onClick={scrollToTop}
        />
      </Fade>
    </div>
  );
}

export default JumpToTop;
