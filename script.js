let moves = 0;
let selectedDisk = null;
let selectedTower = null;
let numberOfDisks = 3;

function startGame(difficulty) {
    numberOfDisks = difficulty;
    moves = 0;
    document.getElementById('moveCount').textContent = moves;
    document.querySelector('.difficulty-selection').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('retry').classList.add('hidden');
    setupTowers();
}

function setupTowers() {
    const tower1 = document.getElementById('tower1');
    tower1.innerHTML = '';

    for (let i = numberOfDisks; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.dataset.size = i;
        disk.style.bottom = `${(numberOfDisks - i) * 30}px`;
        tower1.appendChild(disk);
    }

    document.getElementById('tower2').innerHTML = '';
    document.getElementById('tower3').innerHTML = '';
}

function selectTower(towerId) {
    const tower = document.getElementById(`tower${towerId}`);
    const topDisk = tower.lastElementChild;

    if (selectedDisk) {
        if (!topDisk || topDisk.dataset.size > selectedDisk.dataset.size) {
            tower.appendChild(selectedDisk);
            adjustDiskPositions(tower);
            selectedDisk = null;
            moves++;
            document.getElementById('moveCount').textContent = moves;
            if (checkWin()) {
                setTimeout(() => {
                    alert('You won!');
                    document.getElementById('retry').classList.remove('hidden');
                }, 500);
            }
        } else {
            alert('Invalid move!');
        }
    } else if (topDisk) {
        selectedDisk = topDisk;
        selectedDisk.remove();
    }
}

function adjustDiskPositions(tower) {
    const disks = Array.from(tower.children);
    disks.forEach((disk, index) => {
        disk.style.bottom = `${index * 30}px`;
    });
}

function checkWin() {
    return document.getElementById('tower3').childElementCount === numberOfDisks;
}

function retryGame() {
    document.querySelector('.difficulty-selection').classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
}
