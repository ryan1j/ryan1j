let balance = 1000;
let blackjackDeck, playerHand, dealerHand;

function updateBalance(amount) {
    balance += amount;
    document.getElementById('balance').textContent = 'Balance: $' + balance;
}

function showHome() {
    document.querySelectorAll('.game').forEach(game => game.classList.add('hidden'));
    document.getElementById('home').classList.remove('hidden');
}

function showGame(gameId) {
    document.querySelectorAll('.game').forEach(game => game.classList.add('hidden'));
    document.getElementById(gameId).classList.remove('hidden');
    document.getElementById('home').classList.add('hidden');
}

function playSlots() {
    const cost = parseInt(document.getElementById('slots-bet').value, 10) || 0;
    if (balance < cost) {
        document.getElementById('slots-result').textContent = 'Not enough money!';
        return;
    }
    updateBalance(-cost);
    const win = Math.random() < 0.5;
    if (win) {
        const prize = 300;
        updateBalance(prize);
        document.getElementById('slots-result').textContent = 'You won $' + prize + '!';
    } else {
        document.getElementById('slots-result').textContent = 'You lost!';
    }
}

function startBlackjack() {
    const cost = parseInt(document.getElementById('blackjack-bet').value, 10) || 0;
    if (balance < cost) {
        document.getElementById('blackjack-result').textContent = 'Not enough money!';
        return;
    }
    updateBalance(-cost);
    blackjackDeck = createDeck();
    shuffleDeck(blackjackDeck);
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    showBlackjackGame();
    updateBlackjackStatus();
}

function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard() {
    return blackjackDeck.pop();
}

function handTotal(hand) {
    let total = 0;
    let aces = 0;
    for (const card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            total += 10;
        } else if (card.value === 'A') {
            aces += 1;
            total += 11;
        } else {
            total += parseInt(card.value, 10);
        }
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}

function showBlackjackGame() {
    document.getElementById('blackjack-game').classList.remove('hidden');
    document.getElementById('blackjack-result').textContent = '';
}

function updateBlackjackStatus() {
    document.getElementById('blackjack-cards').textContent = 'Your hand: ' + formatHand(playerHand) + ' (Total: ' + handTotal(playerHand) + ')';
    document.getElementById('blackjack-total').textContent = 'Dealer’s hand: ' + formatHand(dealerHand, true) + ' (Total: ' + handTotal(dealerHand) + ')';
}

function formatHand(hand, hideFirstCard = false) {
    return hand.map((card, index) => {
        if (hideFirstCard && index === 0) {
            return '[Hidden]';
        } else {
            return `${card.value} of ${card.suit}`;
        }
    }).join(', ');
}

function hit() {
    playerHand.push(dealCard());
    updateBlackjackStatus();
    if (handTotal(playerHand) > 21) {
        document.getElementById('blackjack-result').textContent = 'Busted! You lost.';
        setTimeout(startBlackjack, 2000); // Restart game after a short delay
    }
}

function stand() {
    while (handTotal(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }
    const playerTotal = handTotal(playerHand);
    const dealerTotal = handTotal(dealerHand);
    let result;
    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        result = 'You win!';
        updateBalance(parseInt(document.getElementById('blackjack-bet').value, 10) * 2);
    } else if (playerTotal < dealerTotal) {
        result = 'Dealer wins!';
    } else {
        result = 'Push!';
        updateBalance(parseInt(document.getElementById('blackjack-bet').value, 10));
    }
    document.getElementById('blackjack-result').textContent = result;
    setTimeout(startBlackjack, 2000); // Restart game after a short delay
}

function playRoulette() {
    const cost = parseInt(document.getElementById('roulette-bet').value, 10) || 0;
    if (balance < cost) {
        document.getElementById('roulette-result').textContent = 'Not enough money!';
        return;
    }
    updateBalance(-cost);
    const win = Math.random() < 0.3;
    if (win) {
        const prize = 400;
        updateBalance(prize);
        document.getElementById('roulette-result').textContent = 'You won $' + prize + '!';
    } else {
        document.getElementById('roulette-result').textContent = 'You lost!';
    }
}

function rollDice() {
    const cost = parseInt(document.getElementById('dice-bet').value, 10) || 0;
    if (balance < cost) {
        document.getElementById('dice-result').textContent = 'Not enough money!';
        return;
    }
    updateBalance(-cost);
    const roll = Math.floor(Math.random() * 6) + 1;
    const win = roll === 6;
    if (win) {
        const prize = 200;
        updateBalance(prize);
        document.getElementById('dice-result').textContent = 'You rolled a 6 and won $' + prize + '!';
    } else {
        document.getElementById('dice-result').textContent = 'You rolled a ' + roll + '. You lost!';
    }
}
