import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper className='w-full h-screen flex flex-col gap-5 items-center justify-center'>
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <span className='font-bold tracking-wider text-xl'>Loading...</span>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    --color: #a5a5b0;
    --size: 70px;
    width: var(--size);
    height: var(--size);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }

  .loader span {
    width: 100%;
    height: 100%;
    background-color: var(--color);
    animation: keyframes-blink 0.6s alternate infinite linear;
  }

  .loader span:nth-child(1) {
    animation-delay: 0ms;
  }

  .loader span:nth-child(2) {
    animation-delay: 200ms;
  }

  .loader span:nth-child(3) {
    animation-delay: 300ms;
  }

  .loader span:nth-child(4) {
    animation-delay: 400ms;
  }

  .loader span:nth-child(5) {
    animation-delay: 500ms;
  }

  .loader span:nth-child(6) {
    animation-delay: 600ms;
  }

  @keyframes keyframes-blink {
    0% {
      opacity: 0.3;
      transform: scale(0.5) rotate(5deg);
    }

    50% {
      opacity: 1;
      transform: scale(1);
    }
  }`;

export default Loader;
