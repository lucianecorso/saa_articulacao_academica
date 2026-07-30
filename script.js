document.addEventListener('DOMContentLoaded', function() {

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        // Esconde todos os conteúdos das abas
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Desativa estilo visual de todos os botões de abas
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Exibe a aba e ativa o botão selecionado
        const targetContent = document.getElementById('content-' + tabId);
        const targetButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);

        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // Associa ouvinte de eventos aos botões
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTab = this.getAttribute('data-tab');
            activateTab(selectedTab);
        });
    });

    function showToastNotification(messageText) {
        const oldToast = document.getElementById('app-toast');
        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'toast-message';
        toast.innerHTML = `<span>✓</span> <span>${messageText}</span>`;

        document.body.appendChild(toast);

        setTimeout(() => {
            if (toast) {
                toast.remove();
            }
        }, 3000);
    }

    function copyToClipboard(textToCopy) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        showToastNotification(`Número <strong>${textToCopy}</strong> copiado com sucesso!`);
    }

    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const valueToCopy = this.getAttribute('data-copy');
            if (valueToCopy) {
                copyToClipboard(valueToCopy);
            }
        });
    });

    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            const query = event.target.value.toLowerCase().trim();
            const searchableElements = document.querySelectorAll('.tab-content p, .tab-content li, .tab-content h4, .tab-content h5, .tab-content strong');

            if (!query) {
                searchableElements.forEach(element => {
                    element.classList.remove('highlight-search');
                });
                return;
            }

            searchableElements.forEach(element => {
                const textContent = element.textContent.toLowerCase();

                if (textContent.includes(query)) {
                    element.classList.add('highlight-search');

                    // Alterna para a aba onde o resultado foi localizado
                    const parentTabContent = element.closest('.tab-content');
                    if (parentTabContent && parentTabContent.classList.contains('hidden')) {
                        const tabId = parentTabContent.id.replace('content-', '');
                        activateTab(tabId);
                    }
                } else {
                    element.classList.remove('highlight-search');
                }
            });
        });
    }

});