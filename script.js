// Fungsi untuk mengganti tab
function switchTab(tabId) {
    // Sembunyikan semua konten tab
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Hapus kelas aktif dari semua tombol tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-purple-600', 'text-purple-600');
        btn.classList.add('text-gray-500');
    });

    // Tampilkan konten tab yang dipilih
    const activeTabContent = document.getElementById(tabId);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
    }

    // Tambahkan kelas aktif ke tombol tab yang diklik
    if (event && event.currentTarget) {
        event.currentTarget.classList.remove('text-gray-500');
        event.currentTarget.classList.add('border-purple-600', 'text-purple-600');
    } else {
        // Untuk panggilan terprogram, aktifkan tombol tab yang sesuai
        const tabBtn = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
        if (tabBtn) {
            tabBtn.classList.remove('text-gray-500');
            tabBtn.classList.add('border-purple-600', 'text-purple-600');
        }
    }
}

// Fungsi untuk menampilkan alamat deposit dan beralih ke tab deposit
function showDepositAddress(asset) {
    // Beralih ke tab deposit
    switchTab('deposit');
    // Tampilkan alamat yang sesuai
    showSelectedAddress(asset);
    // Perbarui dropdown
    document.getElementById('asset-select').value = asset;
    // Scroll ke bagian deposit agar terlihat
    const depositSection = document.getElementById('deposit');
    if (depositSection) {
        depositSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fungsi untuk menampilkan alamat berdasarkan pilihan dropdown
function showSelectedAddress(asset) {
    // Sembunyikan semua blok alamat
    document.querySelectorAll('.address-content').forEach(content => {
        content.classList.add('hidden');
    });

    if (asset) {
        // Tampilkan blok alamat yang dipilih
        const addressBlock = document.getElementById(asset + '-address');
        if (addressBlock) {
            addressBlock.classList.remove('hidden');
        }
    }
}

// Fungsi untuk menyalin alamat ke clipboard
function copyAddress(asset) {
    let address = '';
    let amount = 0;

    if (asset === 'btc') {
        address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493w83f6u5hha40c';
        amount = document.getElementById('btc-amount').value;
    } else if (asset === 'eth') {
        address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
        amount = document.getElementById('eth-amount').value;
    } else if (asset === 'sol') {
        address = 'HN5XkCzZiuH3z8ZzhYQH5RfK8mJZ3Yq3X7Xq5vL9J2K';
        amount = document.getElementById('sol-amount').value;
    }

    if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid amount to stake');
        return;
    }

    navigator.clipboard.writeText(address).then(() => {
        alert(`Address copied to clipboard!\nYou are staking ${amount} ${asset.toUpperCase()}`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Jalankan saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tab 'staking' aktif secara default
    switchTab('staking', { currentTarget: document.querySelector('.tab-btn') });

    // Tampilkan alamat BTC secara default pada tab deposit
    showSelectedAddress('btc');

    // Tambahkan event listener untuk select deposit
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', (event) => {
            showSelectedAddress(event.target.value);
        });
    }
});