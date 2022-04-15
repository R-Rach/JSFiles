// INDEX PAGE -> DRS VSR button
(async APILoader => {
    const API = await APILoader.create(document.currentScript || 'tekion-digital-retailing');

    API.subscribe('page-load-v1', ev => {
        if (ev.payload.indexPage) {
            const button = API.create('button', {
                href: 'https://drs.' + ev.payload.accountId + '.com/drs/inventory/search',
                text: {
                  'en_US': 'Digital Showroom'
                },
                classes: 'btn btn-primary mx-auto',
                attributes: {
                  'target': '_self'
                },
                onclick: () => {
                  window.MyIntegration.activateModalOverlay();
                }
            });
            return button;
        }
    });
  })(window.DDC.APILoader);


// SEARCH PAGE -> DRS VSR banner
(async APILoader => {
    const API = await APILoader.create(document.currentScript || 'tekion-digital-retailing');
    
    API.subscribe('page-load-v1', ev => {
        if (ev.payload.searchPage) {
            API.insert('primary-banner', (elem, meta) => {
                const img = document.createElement('img'),
                a = document.createElement('a');

                img.src = 'https://pictures.dealer.com/d/ddcdemohonda/0217/15bd9bd8ecf0b2a292a91cecb08c595bx.jpg';
                img.alt = 'Tekion DRS VSR';
                img.title = 'Tekion DRS Vehicle Search Result';

                a.href = 'https://drs.' + meta.accountId + '.com/drs/inventory/search',
                a.innerHTML = img.outerHTML;

                API.append(elem, a);
            });
        }
    });
})(window.DDC.APILoader);


// SEARCH PAGE or DETAILS PAGE -> DRS VDP CTA
(async APILoader => {
    const API = await APILoader.create(document.currentScript || 'tekion-digital-retailing');
    
    API.subscribe('page-load-v1', ev => {
        if (ev.payload.searchPage || ev.payload.detailPage) {
            API.insertCallToAction('button', 'value-a-trade', meta => {
                return {
                    type: 'default',
                    href: 'https://drs.' + ev.payload.accountId + '.com/drs/inventory/vehicle?vehicleId=' + meta.stockNumber + '_' + meta.vin,
                    target: '_blank',
                    text: {
                        en_US: 'Start Purchase'
                    }
                }
            });
        }
    });
})(window.DDC.APILoader);