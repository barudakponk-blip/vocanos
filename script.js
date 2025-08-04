// Fungsi untuk mengganti tab
function switchTab(tabId, event) {
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
        const tabBtn = document.querySelector(`[onclick^="switchTab('${tabId}'"]`);
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
    const addressBlock = document.getElementById(asset + '-address');
    if (addressBlock) {
        const address = addressBlock.querySelector('.font-mono').innerText;
        navigator.clipboard.writeText(address).then(() => {
            alert('Address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}

// Jalankan saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tab 'staking' aktif secara default
    switchTab('staking', { currentTarget: document.querySelector('.tab-btn') });

    // Tambahkan event listener untuk select deposit
    const assetSelect = document.getElementById('asset-select');
    if (assetSelect) {
        assetSelect.addEventListener('change', (event) => {
            showSelectedAddress(event.target.value);
        });
    }
});