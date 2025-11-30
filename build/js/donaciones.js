// Sistema de Donaciones - PayPal y Transferencias Bancarias

let selectedAmount = null;

// Inicializar cuando el modal se abre
document.addEventListener('DOMContentLoaded', function() {
  const modalDonaciones = document.getElementById('modal-donaciones');
  
  if (modalDonaciones) {
    modalDonaciones.addEventListener('show.bs.modal', function() {
      initializeDonationModal();
    });
    
    modalDonaciones.addEventListener('hidden.bs.modal', function() {
      // Limpiar cuando se cierra
      document.getElementById('custom-amount').value = '';
      selectedAmount = null;
      document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
      }
    });
  }
  
  // Event listeners para botones de montos
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const amount = this.dataset.amount;
      selectAmount(amount);
    });
  });
  
  // Botón de PayPal con monto personalizado
  const paypalDonateBtn = document.getElementById('paypal-donate-btn');
  if (paypalDonateBtn) {
    paypalDonateBtn.addEventListener('click', function() {
      const customAmount = document.getElementById('custom-amount').value;
      if (customAmount && parseFloat(customAmount) > 0) {
        selectAmount(customAmount);
        initializePayPal(parseFloat(customAmount));
      } else {
        alert('Por favor, ingresa un monto válido o selecciona uno de los montos sugeridos.');
      }
    });
  }
  
  // Cuando se cambia el monto personalizado, actualizar PayPal
  const customAmountInput = document.getElementById('custom-amount');
  if (customAmountInput) {
    customAmountInput.addEventListener('input', function() {
      if (this.value && parseFloat(this.value) > 0) {
        selectedAmount = parseFloat(this.value);
      }
    });
  }
});

function selectAmount(amount) {
  selectedAmount = parseFloat(amount);
  
  // Actualizar UI de botones
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.amount === amount.toString()) {
      btn.classList.add('active');
    }
  });
  
  // Actualizar input personalizado
  document.getElementById('custom-amount').value = amount;
  
  // Inicializar PayPal con el monto seleccionado
  initializePayPal(selectedAmount);
}

function initializeDonationModal() {
  // Aquí puedes cargar configuraciones adicionales si es necesario
  console.log('Modal de donaciones abierto');
}

function initializePayPal(amount) {
  const container = document.getElementById('paypal-button-container');
  
  if (!container) {
    console.error('No se encontró el contenedor de PayPal');
    return;
  }
  
  // Verificar que PayPal SDK esté cargado
  if (typeof paypal === 'undefined') {
    container.innerHTML = `
      <div class="alert alert-warning">
        <p class="mb-0">PayPal no está disponible en este momento. Por favor, usa una de las otras opciones de donación.</p>
      </div>
    `;
    return;
  }
  
  // Limpiar contenedor
  container.innerHTML = '';
  
  // Configurar PayPal
  paypal.Buttons({
    style: {
      color: 'blue',
      shape: 'rect',
      label: 'donate',
      height: 50
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount.toFixed(2),
            currency_code: 'USD'
          },
          description: 'Donación a Fundación Rompiendo Barreras Sin Límites'
        }],
        application_context: {
          brand_name: 'FunRobHum',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: window.location.href,
          cancel_url: window.location.href
        }
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Donación exitosa
        showSuccessMessage(details);
        
        // Opcional: Enviar información al servidor
        sendDonationToServer(details, amount);
      });
    },
    onError: function(err) {
      console.error('Error en PayPal:', err);
      container.innerHTML = `
        <div class="alert alert-danger">
          <p class="mb-0">Ocurrió un error al procesar la donación. Por favor, intenta de nuevo o usa otra opción de pago.</p>
        </div>
      `;
    },
    onCancel: function(data) {
      console.log('Donación cancelada por el usuario');
    }
  }).render('#paypal-button-container');
}

function showSuccessMessage(details) {
  const container = document.getElementById('paypal-button-container');
  container.innerHTML = `
    <div class="alert alert-success">
      <h5 class="alert-heading"><i class="bi bi-check-circle-fill"></i> ¡Donación exitosa!</h5>
      <p class="mb-2">Gracias por tu generosidad. Tu donación ha sido procesada correctamente.</p>
      <p class="mb-0 small">ID de transacción: ${details.id}</p>
    </div>
  `;
  
  // Cerrar modal después de 3 segundos
  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-donaciones'));
    if (modal) {
      modal.hide();
    }
  }, 5000);
}

function sendDonationToServer(details, amount) {
  // Esta función se puede usar para enviar la información al servidor
  // Por ahora solo se registra en la consola
  
  const donationData = {
    transaction_id: details.id,
    amount: amount,
    payer_name: details.payer.name.given_name + ' ' + details.payer.name.surname,
    payer_email: details.payer.email_address,
    timestamp: new Date().toISOString(),
    status: details.status
  };
  
  console.log('Datos de donación:', donationData);
  
  // Aquí puedes agregar código para enviar a tu servidor:
  // fetch('/api/donations', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(donationData)
  // });
}

// Función para copiar número de cuenta
function copyAccountNumber() {
  const accountNumber = document.getElementById('account-number').textContent;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(accountNumber).then(function() {
      // Mostrar mensaje de éxito
      const btn = event.target.closest('button');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check"></i> Copiado';
      btn.classList.add('text-success');
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('text-success');
      }, 2000);
    });
  } else {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = accountNumber;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    alert('Número de cuenta copiado: ' + accountNumber);
  }
}

