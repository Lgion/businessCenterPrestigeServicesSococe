function e(){let e=document.getElementById(`global-admin-form`),t=document.getElementById(`admin-page-save-btn`),n=document.getElementById(`sidebar-export-btn`),r=document.getElementById(`sidebar-import-input`),i=document.getElementById(`sidebar-reset-btn`);function a(){let e=localStorage.getItem(`bcps_site_data`);if(e)try{let t=JSON.parse(e);t.name&&(document.getElementById(`adm-name`).value=t.name),t.phoneFormatted&&(document.getElementById(`adm-phone`).value=t.phoneFormatted),t.whatsappFormatted&&(document.getElementById(`adm-whatsapp`).value=t.whatsappFormatted),t.whatsappPreFilled&&(document.getElementById(`adm-whatsapp-msg`).value=t.whatsappPreFilled),t.address&&(document.getElementById(`adm-address`).value=t.address),t.openingHours&&(document.getElementById(`adm-hours`).value=t.openingHours),t.scheduleNote&&(document.getElementById(`adm-schedule-note`).value=t.scheduleNote),t.announcementBadge&&(document.getElementById(`adm-ann-badge`).value=t.announcementBadge),t.announcementText&&(document.getElementById(`adm-ann-text`).value=t.announcementText),t.seasonSelect&&(document.getElementById(`adm-season-select`).value=t.seasonSelect),t.seasonTitle&&(document.getElementById(`adm-season-title`).value=t.seasonTitle),t.seasonSubtitle&&(document.getElementById(`adm-season-sub`).value=t.seasonSubtitle),t.wavePhone&&(document.getElementById(`adm-wave-phone`).value=t.wavePhone),t.waveAmount&&(document.getElementById(`adm-wave-amount`).value=t.waveAmount),t.waveBanks&&(document.getElementById(`adm-wave-banks`).value=t.waveBanks),t.servicesCustom&&t.servicesCustom.forEach(e=>{let t=document.querySelector(`[data-service-id="${e.id}"]`);if(t){let n=t.querySelector(`.svc-image-input`),r=t.querySelector(`.svc-title-input`),i=t.querySelector(`.svc-subtitle-input`),a=t.querySelector(`.svc-thumb-img`);if(n&&e.image&&(n.value=e.image,a&&(a.src=e.image)),r&&e.title&&(r.value=e.title),i&&e.subtitle&&(i.value=e.subtitle),e.items&&e.items.length){let n=t.querySelector(`.svc-items-container`);n&&(n.innerHTML=``,e.items.forEach(e=>{let t=document.createElement(`div`);t.className=`svc-item-row`,t.innerHTML=`
                      <span class="bullet-dot">›</span>
                      <input type="text" class="adm-input svc-item-input" value="${e}" />
                      <button type="button" class="btn-del-item del-svc-item-btn" title="Supprimer cette prestation">🗑️</button>
                    `,n.appendChild(t)}))}}})}catch(e){console.error(`Error loading saved admin data`,e)}}a(),document.querySelectorAll(`.svc-image-input`).forEach(e=>{e.addEventListener(`input`,e=>{let t=e.target.value,n=e.target.closest(`.service-editor-card`)?.querySelector(`.svc-thumb-img`);n&&(n.src=t)})}),document.addEventListener(`click`,e=>{let t=e.target;t.classList.contains(`del-svc-item-btn`)&&t.closest(`.svc-item-row`)?.remove(),t.classList.contains(`del-seasonal-prod-btn`)&&t.closest(`.prod-admin-card`)?.remove(),t.classList.contains(`del-pricing-pkg-btn`)&&t.closest(`.pkg-admin-card`)?.remove(),t.classList.contains(`del-btq-prod-btn`)&&t.closest(`.btq-admin-card`)?.remove()}),document.querySelectorAll(`.add-svc-item-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.service-editor-card`)?.querySelector(`.svc-items-container`);if(t){let e=document.createElement(`div`);e.className=`svc-item-row`,e.innerHTML=`
            <span class="bullet-dot">›</span>
            <input type="text" class="adm-input svc-item-input" value="Nouvelle prestation..." />
            <button type="button" class="btn-del-item del-svc-item-btn" title="Supprimer cette prestation">🗑️</button>
          `,t.appendChild(e)}})}),document.getElementById(`btn-add-seasonal-prod`)?.addEventListener(`click`,()=>{let e=document.getElementById(`seasonal-prods-admin-list`);if(!e)return;let t=`prod-`+Date.now(),n=document.createElement(`div`);n.className=`prod-admin-card`,n.setAttribute(`data-prod-id`,t),n.innerHTML=`
        <div class="prod-admin-media">
          <img src="/images/boutique-gifts.jpg" alt="Nouveau produit" class="prod-admin-img" />
        </div>
        <div class="prod-admin-form">
          <div class="prod-row-1">
            <input type="text" class="adm-input prod-name-input" value="Nouveau Produit Saisonnier" placeholder="Nom du produit" />
            <select class="adm-select prod-season-select">
              <option value="rentree">Rentrée Scolaire</option>
              <option value="noel">Fêtes & Noël</option>
              <option value="mariages">Cérémonies & Mariages</option>
              <option value="hightech">High-Tech & Gaming</option>
            </select>
          </div>
          <div class="prod-row-2">
            <input type="number" class="adm-input prod-price-input" value="10000" placeholder="Prix FCFA" />
            <input type="text" class="adm-input prod-badge-input" value="Nouveauté" placeholder="Badge promo" />
            <input type="text" class="adm-input prod-img-input" value="/images/boutique-gifts.jpg" placeholder="URL Image" />
          </div>
          <input type="text" class="adm-input prod-desc-input" value="Description courte du produit..." placeholder="Courte description" />
          <div class="prod-row-del">
            <button type="button" class="btn-del-prod del-seasonal-prod-btn">🗑️ Supprimer ce produit</button>
          </div>
        </div>
      `,e.prepend(n)}),document.getElementById(`btn-add-pricing-pkg`)?.addEventListener(`click`,()=>{let e=document.getElementById(`pricing-pkgs-admin-list`);if(!e)return;let t=`pkg-`+Date.now(),n=document.createElement(`div`);n.className=`pkg-admin-card`,n.setAttribute(`data-pkg-id`,t),n.innerHTML=`
        <div class="pkg-admin-row-top">
          <input type="text" class="adm-input pkg-title-input" value="Nouvelle Formule" placeholder="Titre de la formule" />
          <input type="text" class="adm-input pkg-cat-input" value="Prestation" placeholder="Catégorie" />
          <input type="text" class="adm-input pkg-price-input" value="10 000 FCFA" placeholder="Prix" />
          <input type="text" class="adm-input pkg-period-input" value="la séance" placeholder="Période" />
        </div>
        <div class="pkg-admin-features-box">
          <label>Caractéristiques incluses</label>
          <textarea class="adm-textarea pkg-features-input" rows="3" placeholder="Une caractéristique par ligne">Caractéristique 1
Caractéristique 2</textarea>
        </div>
        <div class="pkg-admin-bottom">
          <label class="checkbox-label">
            <input type="checkbox" class="pkg-popular-checkbox" />
            <span>Formule la plus populaire (Mise en avant or)</span>
          </label>
          <button type="button" class="btn-del-prod del-pricing-pkg-btn">🗑️ Supprimer cette formule</button>
        </div>
      `,e.prepend(n)}),document.getElementById(`btn-add-boutique-prod`)?.addEventListener(`click`,()=>{let e=document.getElementById(`boutique-admin-list`);if(!e)return;let t=`btq-`+Date.now(),n=document.createElement(`div`);n.className=`btq-admin-card`,n.setAttribute(`data-btq-id`,t),n.innerHTML=`
        <div class="btq-admin-top">
          <img src="/images/hero-store.jpg" alt="Article" class="btq-admin-thumb" />
          <div class="btq-admin-main-inputs">
            <input type="text" class="adm-input btq-name-input" value="Nouvel Article en Boutique" placeholder="Nom de l'article" />
            <div class="btq-row-price-cat">
              <input type="number" class="adm-input btq-price-input" value="15000" placeholder="Prix FCFA" />
              <select class="adm-select btq-cat-select">
                <option value="gaming">Gaming & Consoles</option>
                <option value="accessoires">High-Tech & Câbles</option>
                <option value="maroquinerie">Sacs & Cuir</option>
                <option value="montres">Montres & Bijoux</option>
                <option value="cadeaux">Cadeaux & Divers</option>
              </select>
            </div>
          </div>
        </div>
        <div class="btq-admin-fields">
          <input type="text" class="adm-input btq-badge-input" value="Disponible" placeholder="Badge" />
          <input type="text" class="adm-input btq-img-input" value="/images/hero-store.jpg" placeholder="URL Image" />
          <textarea class="adm-textarea btq-desc-input" rows="2" placeholder="Description de l'article">Description de l'article disponible au magasin...</textarea>
        </div>
        <div class="btq-admin-footer">
          <label class="checkbox-label">
            <input type="checkbox" class="btq-stock-checkbox" checked />
            <span>Article en stock au Super U</span>
          </label>
          <button type="button" class="btn-del-prod del-btq-prod-btn">🗑️ Supprimer</button>
        </div>
      `,e.prepend(n)});function o(){let e=document.getElementById(`adm-name`).value,t=document.getElementById(`adm-phone`).value,n=document.getElementById(`adm-whatsapp`).value,r=document.getElementById(`adm-whatsapp-msg`).value,i=document.getElementById(`adm-address`).value,a=document.getElementById(`adm-hours`).value,o=document.getElementById(`adm-schedule-note`).value,s=document.getElementById(`adm-ann-badge`).value,c=document.getElementById(`adm-ann-text`).value,l=document.getElementById(`adm-season-select`).value,u=document.getElementById(`adm-season-title`).value,d=document.getElementById(`adm-season-sub`).value,f=document.getElementById(`adm-wave-phone`).value,p=document.getElementById(`adm-wave-amount`).value,m=document.getElementById(`adm-wave-banks`).value,h=[];document.querySelectorAll(`.service-editor-card`).forEach(e=>{let t=e.getAttribute(`data-service-id`)||``,n=e.querySelector(`.svc-title-input`)?.value||``,r=e.querySelector(`.svc-subtitle-input`)?.value||``,i=e.querySelector(`.svc-badge-input`)?.value||``,a=e.querySelector(`.svc-popular-input`)?.value||``,o=e.querySelector(`.svc-image-input`)?.value||``,s=[];e.querySelectorAll(`.svc-item-input`).forEach(e=>{let t=e.value.trim();t&&s.push(t)}),h.push({id:t,title:n,subtitle:r,badge:i,popularTag:a,image:o,items:s})});let g=[];document.querySelectorAll(`.prod-admin-card`).forEach(e=>{let t=e.getAttribute(`data-prod-id`)||``,n=e.querySelector(`.prod-name-input`)?.value||``,r=e.querySelector(`.prod-season-select`)?.value||`rentree`,i=parseInt(e.querySelector(`.prod-price-input`)?.value||`0`,10),a=e.querySelector(`.prod-badge-input`)?.value||``,o=e.querySelector(`.prod-img-input`)?.value||``,s=e.querySelector(`.prod-desc-input`)?.value||``;g.push({id:t,name:n,seasonId:r,price:i,badge:a,image:o,description:s})});let _=[];document.querySelectorAll(`.pkg-admin-card`).forEach(e=>{let t=e.getAttribute(`data-pkg-id`)||``,n=e.querySelector(`.pkg-title-input`)?.value||``,r=e.querySelector(`.pkg-cat-input`)?.value||``,i=e.querySelector(`.pkg-price-input`)?.value||``,a=e.querySelector(`.pkg-period-input`)?.value||``,o=e.querySelector(`.pkg-popular-checkbox`)?.checked||!1,s=(e.querySelector(`.pkg-features-input`)?.value||``).split(`
`).map(e=>e.trim()).filter(Boolean);_.push({id:t,title:n,category:r,price:i,period:a,popular:o,features:s})});let v=[];document.querySelectorAll(`.btq-admin-card`).forEach(e=>{let t=e.getAttribute(`data-btq-id`)||``,n=e.querySelector(`.btq-name-input`)?.value||``,r=e.querySelector(`.btq-cat-select`)?.value||`gaming`,i=parseInt(e.querySelector(`.btq-price-input`)?.value||`0`,10),a=e.querySelector(`.btq-badge-input`)?.value||``,o=e.querySelector(`.btq-img-input`)?.value||``,s=e.querySelector(`.btq-desc-input`)?.value||``,c=e.querySelector(`.btq-stock-checkbox`)?.checked||!1;v.push({id:t,name:n,category:r,price:i,badge:a,image:o,description:s,inStock:c})});let y={name:e,phoneFormatted:t,whatsappFormatted:n,whatsappPreFilled:r,address:i,openingHours:a,scheduleNote:o,announcementBadge:s,announcementText:c,seasonSelect:l,seasonTitle:u,seasonSubtitle:d,wavePhone:f,waveAmount:p,waveBanks:m,servicesCustom:h,seasonalProductsCustom:g,pricingPackagesCustom:_,boutiqueProductsCustom:v};localStorage.setItem(`bcps_site_data`,JSON.stringify(y)),window.showToast?window.showToast(`Toutes les modifications ont été enregistrées et appliquées en direct !`,`✅`):alert(`Toutes les modifications ont été enregistrées et appliquées en direct !`)}e?.addEventListener(`submit`,e=>{e.preventDefault(),o()}),t?.addEventListener(`click`,()=>{o()}),n?.addEventListener(`click`,()=>{o();let e=localStorage.getItem(`bcps_site_data`)||`{}`,t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`bcps-site-config.json`,r.click(),URL.revokeObjectURL(n)}),r?.addEventListener(`change`,e=>{let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=e.target?.result;JSON.parse(t),localStorage.setItem(`bcps_site_data`,t),alert(`Configuration importée avec succès ! La page va se recharger.`),location.reload()}catch{alert(`Fichier JSON invalide.`)}},n.readAsText(t)}),i?.addEventListener(`click`,()=>{confirm(`Voulez-vous restaurer toutes les valeurs par défaut de la boutique ?`)&&(localStorage.removeItem(`bcps_site_data`),location.reload())});function s(){let e=document.querySelector(`.admin-nav-sidebar`),t=document.querySelector(`.sidebar-sticky-box`);if(e&&t){if(window.innerWidth>1024){let n=e.getBoundingClientRect();t.style.position=`fixed`,t.style.top=`90px`,t.style.left=`${n.left}px`,t.style.width=`${e.clientWidth}px`}else t.style.position=``,t.style.top=``,t.style.left=``,t.style.width=``}}s(),window.addEventListener(`resize`,s),window.addEventListener(`scroll`,s,{passive:!0});let c=document.querySelectorAll(`.admin-card-section`),l=document.querySelectorAll(`.sidebar-link`);if(`IntersectionObserver`in window){let e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let t=e.target.getAttribute(`id`);l.forEach(e=>{e.getAttribute(`href`)===`#${t}`?e.classList.add(`active`):e.classList.remove(`active`)})}})},{rootMargin:`-20% 0px -65% 0px`});c.forEach(t=>e.observe(t))}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,e):e();