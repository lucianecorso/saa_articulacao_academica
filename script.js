/**
 * LÓGICA DE PROGRAMAÇÃO SAA NRE IRATI
 * Desenvolvido sem qualquer codigo inline para separacao total de responsabilidades.
 */

document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================
       GERENCIADOR DE ABAS (TABS)
       ========================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        // Esconde todos os conteudos de abas
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Desativa estilo de todos os botoes
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Ativa apenas a aba e botão selecionados
        const targetContent = document.getElementById('content-' + tabId);
        const targetButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);

        if (targetContent) {
            targetContent.classList.remove('hidden');
        }

        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // Associa evento de clique aos botoes das abas via Event Listener
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTab = this.getAttribute('data-tab');
            activateTab(selectedTab);
        });
    });


    /* ==========================================
       SISTEMA DE CÓPIA PARA ÁREA DE TRANSFERÊNCIA (TOAST)
       ========================================== */
    function showToastNotification(messageText) {
        // Remove toast anterior se existir
        const oldToast = document.getElementById('app-toast');
        if (oldToast) {
            oldToast.remove();
        }

        // Cria elemento de notificação dinâmico
        const toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'toast-message';
        toast.innerHTML = `<span>✓</span> <span>${messageText}</span>`;

        document.body.appendChild(toast);

        // Oculta automaticamente após 3 segundos
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

    // Associa evento de clique a todos os botões com atributo data-copy
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const valueToCopy = this.getAttribute('data-copy');
            if (valueToCopy) {
                copyToClipboard(valueToCopy);
            }
        });
    });


    /* ==========================================
       SISTEMA DE FILTRO E BUSCA EM TEMPO REAL
       ========================================== */
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            const query = event.target.value.toLowerCase().trim();
            const searchableElements = document.querySelectorAll('.tab-content p, .tab-content li, .tab-content h4, .tab-content h5, .tab-content strong');

            // Se campo de busca estiver vazio, remove destaques
            if (!query) {
                searchableElements.forEach(element => {
                    element.classList.remove('highlight-search');
                });
                return;
            }

            // Destaca elementos correspondentes e abre a aba correspondente
            searchableElements.forEach(element => {
                const textContent = element.textContent.toLowerCase();

                if (textContent.includes(query)) {
                    element.classList.add('highlight-search');

                    // Se o item encontrado estiver em uma aba oculta, abre a aba
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