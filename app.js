// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const textBehind = document.getElementById("text-behind");
    const textBehindBlur = document.getElementById("text-behind-blur");
    const textFront = document.getElementById("text-front");
    const frostedCard = document.querySelector(".frosted-card");
    const glassButton = document.querySelector(".glass-button");
    
    // Variables to control the animation
    const heroSection = document.querySelector(".hero");
    const heroHeight = heroSection.offsetHeight;
    let isHeroLocked = false;
    let lastScrollPosition = 0;
    
    // Initial states
    textBehind.style.opacity = "1";
    textBehindBlur.style.opacity = "1";
    textFront.style.opacity = "1";
    frostedCard.style.opacity = "0";
    glassButton.style.opacity = "0";
    glassButton.style.transform = "translateY(20px)";
    
    // Function to handle scroll events
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const scrollPercentage = Math.min(scrollPosition / (heroHeight * 0.5), 1);
      
      // Check if we're in the hero section
      if (scrollPosition <= heroHeight && !isHeroLocked) {
        // Fade out headline text
        const textOpacity = Math.max(1 - scrollPercentage * 2, 0);
        textBehind.style.opacity = textOpacity.toString();
        textBehindBlur.style.opacity = textOpacity.toString();
        textFront.style.opacity = textOpacity.toString();
        
        // Move headline text upward
        const textTranslate = scrollPercentage * -50; // Move up to 50px upward
        textBehind.style.transform = `translateY(${textTranslate}px)`;
        textBehindBlur.style.transform = `translateY(${textTranslate}px)`;
        textFront.style.transform = `translateY(${textTranslate}px)`;
        
        // Fade in frosted card
        const cardOpacity = Math.min(scrollPercentage * 1.5, 1);
        frostedCard.style.opacity = cardOpacity.toString();
        
        // When card is nearly visible, show the button
        if (cardOpacity > 0.7) {
          const buttonOpacity = (cardOpacity - 0.7) * 3.3; // Normalized to go from 0 to 1
          const buttonTranslate = 20 - (buttonOpacity * 20); // Move from 20px to 0px
          
          glassButton.style.opacity = buttonOpacity.toString();
          glassButton.style.transform = `translateY(${buttonTranslate}px)`;
        }
      } else if (scrollPosition > heroHeight && !isHeroLocked) {
        // Lock the animation state when scrolling past the hero section
        isHeroLocked = true;
        
        // Set final animation states
        textBehind.style.opacity = "0";
        textBehindBlur.style.opacity = "0";
        textFront.style.opacity = "0";
        textBehind.style.transform = "translateY(-50px)";
        textBehindBlur.style.transform = "translateY(-50px)";
        textFront.style.transform = "translateY(-50px)";
        frostedCard.style.opacity = "1";
        glassButton.style.opacity = "1";
        glassButton.style.transform = "translateY(0)";
      } else if (scrollPosition <= heroHeight && isHeroLocked) {
        // Unlock the animation when scrolling back to the hero section
        isHeroLocked = false;
      }
      
      lastScrollPosition = scrollPosition;
    }
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Run once on page load to set initial state
    handleScroll();
  });