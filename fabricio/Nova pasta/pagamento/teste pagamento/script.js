function selectPayment(method) {
    document.querySelector('.pix-qr').style.display = 'none';
    document.querySelector('.payment-form').style.display = 'none';
  
    if (method === 'pix') {
      document.querySelector('.pix-qr').style.display = 'block';
      generateQRCode();
    } else if (method === 'credit') {
      document.querySelector('.payment-form').style.display = 'block';
    }
  }
  
  function generateQRCode() {
    const qrCodeDiv = document.getElementById('qrcode');
    qrCodeDiv.innerHTML = '';
    const qr = new QRCode(qrCodeDiv, {
      text: "chave-pix-ou-payload-aqui",
      width: 200,
      height: 200
    });
  }
  
  function payWithCard() {
    const number = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('cardExpiry').value;
    const cvv = document.getElementById('cardCvv').value;
    
    if (number && expiry && cvv) {
      alert('Pagamento efetuado com cartão!');
    } else {
      alert('Preencha todos os campos!');
    }
  }