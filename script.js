// Contenu complet et quasi-original pour ton fichier script.js
// Avec ajout pour la musique et suppression des doublons finaux

document.addEventListener('DOMContentLoaded', () => {

    // Sélection des éléments (Original)
    const startButton = document.getElementById('startButton');
    const mainMessage = document.getElementById('mainMessage');
    const wishesContainer = document.getElementById('wishesContainer');
    const wish1 = document.getElementById('wish1');
    const wish2 = document.getElementById('wish2');
    const wish3 = document.getElementById('wish3');
    const wish4 = document.getElementById('wish4');
    const emojiContainer = document.getElementById('emojiContainer');
    const finalHeartContainer = document.getElementById('finalHeartContainer');
    const finalHeartElement = document.getElementById('finalHeart');
    const flowerCanvas = document.getElementById('flowerCanvas');
    // Ajout nécessaire pour sélectionner l'audio
    const bgMusic = document.getElementById('bg-music');
    let ctx = null;
    let animationFrameId = null;

    // Constantes de temps (Original)
    const WISH_DELAY = 4400; // 5 secondes
    const EMOJI_APPEAR_DELAY = 4000;
    const HEART_APPEAR_DELAY = 3000;
    const FLOWER_ANIMATION_DELAY = 34000; // 33 secondes

    // --- Fonctions utilitaires (Original) ---
    function showElement(element) {
        if (element) element.classList.remove('hidden');
    }
    function hideElement(element) {
        if (element) element.classList.add('hidden');
    }

    // --- Logique d'animation de la fleur sur Canvas (Version 2: pétales courbés + glow) (Original) ---
    let flowerAngle = 0;
    let flowerScale = 1;
    let scaleDirection = 0.005; // Légère respiration
    const numPetals = 8; // Nombre de pétales
    const petalColor = '#a569bd'; // Violet clair (on pourrait utiliser #C77DFF pour plus vif)
    const glowColor = '#e0b0ff'; // Couleur du glow (violet très pâle)

    function drawFlowerFrame() { // Fonction originale
        if (!ctx) return;
        const canvasWidth = flowerCanvas.width;
        const canvasHeight = flowerCanvas.height;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        // Ajustement des dimensions pour la forme courbée
        const petalLength = canvasWidth * 0.4; // Longueur max du pétale depuis le centre
        const petalMaxWidth = canvasWidth * 0.15; // Largeur max du pétale
        // Effacer le canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Sauvegarder l'état du contexte
        ctx.save();
        // Se placer au centre
        ctx.translate(centerX, centerY);
        // Appliquer l'échelle (respiration)
        ctx.scale(flowerScale, flowerScale);
        // Appliquer la rotation globale
        ctx.rotate(flowerAngle);
        // --- Dessiner les pétales ---
        ctx.fillStyle = petalColor;
        // Ajouter l'effet Glow
        ctx.shadowBlur = 15; // Flou du glow
        ctx.shadowColor = glowColor; // Couleur du glow
        for (let i = 0; i < numPetals; i++) {
            ctx.rotate((Math.PI * 2) / numPetals); // Rotation pour chaque pétale
            // Dessiner une forme de pétale courbée (type goutte/flamme simple)
            ctx.beginPath();
            ctx.moveTo(0, 0); // Commence au centre
            // Courbe de Bézier quadratique pour un côté du pétale
            ctx.quadraticCurveTo(petalLength * 0.6, -petalMaxWidth / 2, petalLength, 0);
            // Courbe de Bézier quadratique pour l'autre côté du pétale
            ctx.quadraticCurveTo(petalLength * 0.6, petalMaxWidth / 2, 0, 0);
            ctx.closePath();
            ctx.fill();
        }
        // --- Dessiner un centre lumineux simple ---
        ctx.beginPath();
        ctx.arc(0, 0, petalMaxWidth * 0.3, 0, Math.PI * 2); // Petit cercle au centre
        ctx.fillStyle = glowColor; // Ou une autre couleur
        ctx.fill();
        // Restaurer l'état du contexte (enlève le shadowBlur pour d'éventuels autres dessins)
        ctx.restore();
    }

    function animateFlower() { // Fonction originale
        // Mettre à jour les variables d'animation
        flowerAngle += 0.008; // Ralentir un peu la rotation ?
        // Effet de respiration
        flowerScale += scaleDirection;
        if (flowerScale > 1.05 || flowerScale < 0.95) { // Réduire l'amplitude de la respiration ?
            scaleDirection *= -1;
        }
        // Dessiner la frame
        drawFlowerFrame();
        // Demander la prochaine frame
        animationFrameId = requestAnimationFrame(animateFlower);
    }

    function startFlowerAnimation() { // Fonction originale
        if (flowerCanvas) {
            ctx = flowerCanvas.getContext('2d');
            if (ctx) {
                showElement(flowerCanvas);
                flowerAngle = 0;
                flowerScale = 1;
                scaleDirection = 0.003; // Ralentir la respiration ?
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                animateFlower();
            }
        }
    }

    function stopFlowerAnimation() { // Fonction originale
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    // --- FIN Logique Fleur (Original) ---


    // --- Écouteur d'événement sur le bouton de démarrage ---
    startButton.addEventListener('click', () => {
        // ====> AJOUT POUR LA MUSIQUE <====
        if (bgMusic) { // Vérifie si l'élément audio existe
             bgMusic.play().catch(error => {
                 // Gère les erreurs potentielles (ex: interaction utilisateur non détectée)
                 console.error("Erreur lors de la lecture de l'audio:", error);
             });
        }
        // ====> FIN AJOUT MUSIQUE <====

        // Reste du code original de l'écouteur :
        hideElement(startButton);
        showElement(mainMessage);
        setTimeout(startWishesSequence, 1500);

        // Déclencher l'animation de FLEUR après FLOWER_ANIMATION_DELAY (Original)
        setTimeout(() => {
            hideElement(finalHeartContainer);
            if (finalHeartElement && finalHeartElement.classList.contains('beating')) {
                finalHeartElement.classList.remove('beating');
            }
            startFlowerAnimation(); // Démarre la NOUVELLE animation de fleur
        }, FLOWER_ANIMATION_DELAY);
    });


    // --- Séquence d'affichage des vœux (Original) ---
    function startWishesSequence() {
        showElement(wishesContainer);
        const wishes = [wish1, wish2, wish3, wish4];
        let delay = 500;
        wishes.forEach((wish, index) => {
            setTimeout(() => {
                showElement(wish);
                if (index === wishes.length - 1) {
                    // Correction possible ici : Délai avant emoji après DERNIER voeu
                    setTimeout(startEmojiSequence, WISH_DELAY); // Délai après le dernier vœu
                }
            }, delay);
            // Augmentation du délai pour le *prochain* vœu (était peut-être décalé)
            delay += WISH_DELAY; // Correct, WISH_DELAY entre chaque vœu
        });
    }


    // --- Séquence Emoji (Original) ---
    function startEmojiSequence() {
        hideElement(mainMessage);
        hideElement(wishesContainer);
        showElement(emojiContainer);
        // Délai avant le coeur
        setTimeout(startHeartSequence, EMOJI_APPEAR_DELAY); // Utilise EMOJI_APPEAR_DELAY ici
    }


    // --- Séquence Cœur Final (Original) ---
    function startHeartSequence() {
        hideElement(emojiContainer);
        showElement(finalHeartContainer);
        if (finalHeartElement) {
            const onAnimationEnd = () => {
                // Assure que la classe 'beating' n'est ajoutée qu'une fois
                if (!finalHeartElement.classList.contains('beating')) {
                     finalHeartElement.classList.add('beating');
                }
            };
            // Écoute la fin de l'animation de zoom pour ajouter le battement
            finalHeartElement.addEventListener('animationend', onAnimationEnd, { once: true });
        }
    }

    // NOTE : Les deux fonctions `startAnimation` qui étaient ici à la fin
    // dans ton code original ont été SUPPRIMÉES car elles étaient en double
    // et non utilisées par le code principal.

}); // Fin DOMContentLoaded
