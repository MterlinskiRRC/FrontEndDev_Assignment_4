/**
 * script.js
 * Handles client-side form validation and custom error message display.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    form.setAttribute('novalidate', true); 

    function showCustomError(input, message) {
        const errorSpan = document.getElementById(`error-${input.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
            input.classList.add('input-error');
        }
    }

    // Helper function to clear a specific error message
    function clearError(input) {
        const errorSpan = document.getElementById(`error-${input.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
            input.classList.remove('input-error');
        }
    }

    // --- Validation Logic Function ---
    function validateInput(input) {
        clearError(input);

        if (input.validity.valueMissing) {
            showCustomError(input, 'This field is required.');
            return false;
        }

        if (input.type === 'email' && input.validity.typeMismatch) {
            showCustomError(input, 'Entered value needs to be an email address.');
            return false;
        }

        if (input.hasAttribute('pattern') && input.validity.patternMismatch) {
            showCustomError(input, input.title || 'Please match the required format.');
            return false;
        }

        if (input.type === 'number') {
            if (input.validity.rangeUnderflow) {
                showCustomError(input, `Value must be at least ${input.min}.`);
                return false;
            }
            if (input.validity.rangeOverflow) {
                showCustomError(input, `Value must be no more than ${input.max}.`);
                return false;
            }
        }
        
        if (input.tagName === 'SELECT' && input.value === '') {
             showCustomError(input, 'Please select an option from the list.');
             return false;
        }

        return true;
    }

    // --- Event Listeners for Real-Time Validation ---
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {

            if (input.type === 'radio' || input.type === 'checkbox') return;
            validateInput(input);
        });
        
        // Clear errors on input
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                clearError(input);
            }
        });
    });

    // --- Form Submission Handler ---
    
    form.addEventListener('submit', (event) => {
        let formIsValid = true;
        
        // 1. Validate all inputs
        inputs.forEach(input => {
            if (input.type !== 'radio' && input.type !== 'checkbox') {
                if (!validateInput(input)) {
                    formIsValid = false;
                }
            }
        });

        const contactRadio = form.elements['contactMethod'];
        const contactError = document.getElementById('error-contactMethod');
        if (contactRadio && !contactRadio.value) {
            contactError.textContent = 'Please select a preferred contact method.';
            formIsValid = false;
        } else if (contactError) {
            contactError.textContent = '';
        }
        

        }
    });

});