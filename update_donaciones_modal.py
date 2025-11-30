#!/usr/bin/env python3
"""
Script para actualizar el modal de donaciones en todos los archivos HTML
"""

import os
import re

# Modal nuevo en español
MODAL_ES = '''      <div id="modal-donaciones" class="modal fade">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0 pb-0">
              <h4 class="modal-title fw-bold text-primary">Haz tu Donación</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            
            <div class="modal-body modal-body_donates p-4">
              <p class="text-center text-muted mb-4">Tu aporte hace la diferencia. Gracias por apoyar nuestra causa.</p>
              
              <!-- Opción 1: PayPal (Recomendado) -->
              <div class="donation-method mb-4">
                <h5 class="mb-3 fw-semibold">
                  <i class="bi bi-paypal text-primary"></i> Donar con PayPal
                </h5>
                <p class="text-muted small mb-3">Acepta tarjetas de crédito, débito y PayPal. Seguro y rápido.</p>
                
                <!-- Botones de montos rápidos -->
                <div class="donation-amounts mb-3 d-flex flex-wrap gap-2 justify-content-center">
                  <button class="btn btn-outline-primary amount-btn" data-amount="10">$10</button>
                  <button class="btn btn-outline-primary amount-btn" data-amount="25">$25</button>
                  <button class="btn btn-outline-primary amount-btn" data-amount="50">$50</button>
                  <button class="btn btn-outline-primary amount-btn" data-amount="100">$100</button>
                  <button class="btn btn-outline-primary amount-btn" data-amount="250">$250</button>
                </div>
                
                <!-- Monto personalizado -->
                <div class="input-group mb-3">
                  <span class="input-group-text">$</span>
                  <input type="number" class="form-control" id="custom-amount" placeholder="Monto personalizado" min="1" step="0.01">
                  <button class="btn btn-primary" id="paypal-donate-btn">
                    <i class="bi bi-paypal"></i> Donar con PayPal
                  </button>
                </div>
                
                <!-- PayPal Button Container -->
                <div id="paypal-button-container" class="text-center"></div>
              </div>
              
              <hr class="my-4">
              
              <!-- Opción 2: Transferencia Bancaria -->
              <div class="donation-method mb-4">
                <h5 class="mb-3 fw-semibold">
                  <i class="bi bi-bank text-success"></i> Transferencia Bancaria
                </h5>
                <p class="text-muted small mb-3">Para donantes en El Salvador. Sin comisiones adicionales.</p>
                
                <div class="bank-info bg-light p-3 rounded">
                  <div class="mb-2">
                    <strong>Banco:</strong> 
                    <span class="text-primary">[Nombre del Banco]</span>
                  </div>
                  <div class="mb-2">
                    <strong>Cuenta:</strong> 
                    <span class="text-primary" id="account-number">[Número de cuenta]</span>
                    <button class="btn btn-sm btn-link p-0 ms-2" onclick="copyAccountNumber()">
                      <i class="bi bi-clipboard"></i> Copiar
                    </button>
                  </div>
                  <div class="mb-0">
                    <strong>Nombre:</strong> 
                    <span class="text-primary">Fundación Rompiendo Barreras Sin Límites</span>
                  </div>
                </div>
                
                <p class="text-muted small mt-3 mb-0">
                  <i class="bi bi-info-circle"></i> 
                  Después de realizar la transferencia, envíanos el comprobante por WhatsApp.
                </p>
              </div>
              
              <hr class="my-4">
              
              <!-- Opción 3: WhatsApp (Como respaldo) -->
              <div class="donation-method text-center">
                <h5 class="mb-3 fw-semibold">
                  <i class="bi bi-whatsapp text-success"></i> O contáctanos directamente
                </h5>
                <a href="https://wa.me/50375717633?text=Hola,%20me%20gustaría%20hacer%20una%20donación" 
                   class="btn btn-success btn-lg" 
                   target="_blank">
                  <i class="bi bi-whatsapp"></i> Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>'''

# Modal nuevo en inglés
MODAL_EN = MODAL_ES.replace("Haz tu Donación", "Make a Donation").replace(
    "Tu aporte hace la diferencia. Gracias por apoyar nuestra causa.", 
    "Your contribution makes a difference. Thank you for supporting our cause."
).replace("Donar con PayPal", "Donate with PayPal").replace(
    "Acepta tarjetas de crédito, débito y PayPal. Seguro y rápido.",
    "Accepts credit cards, debit cards and PayPal. Secure and fast."
).replace("Monto personalizado", "Custom amount").replace(
    "Donar con PayPal", "Donate with PayPal"
).replace("Transferencia Bancaria", "Bank Transfer").replace(
    "Para donantes en El Salvador. Sin comisiones adicionales.",
    "For donors in El Salvador. No additional fees."
).replace("Banco:", "Bank:").replace("Cuenta:", "Account:").replace(
    "Copiar", "Copy"
).replace("Nombre:", "Name:").replace(
    "Después de realizar la transferencia, envíanos el comprobante por WhatsApp.",
    "After making the transfer, send us the receipt via WhatsApp."
).replace("O contáctanos directamente", "Or contact us directly").replace(
    "Chatear por WhatsApp", "Chat on WhatsApp"
).replace(
    "Hola,%20me%20gustaría%20hacer%20una%20donación",
    "Hello,%20I%20would%20like%20to%20make%20a%20donation"
)

# Scripts a agregar (para archivos en raíz)
SCRIPTS_ROOT = '''    <!-- PayPal SDK -->
    <script src="https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID_PAYPAL_AQUI&currency=USD&intent=capture"></script>
    
    <script src="./build/js/bootstrap.bundle.min.js"></script>
    <script src="./build/js/app.js"></script>
    <script src="./build/js/donaciones.js"></script>'''

# Scripts a agregar (para archivos en carpeta en/)
SCRIPTS_EN = SCRIPTS_ROOT.replace('./build/js/', '../build/js/')

def update_file(filepath, is_english=False):
    """Actualiza un archivo HTML con el nuevo modal"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Determinar qué modal y scripts usar
        modal = MODAL_EN if is_english else MODAL_ES
        scripts = SCRIPTS_EN if is_english else SCRIPTS_ROOT
        
        # Patrón para encontrar el modal antiguo (flexible)
        old_modal_pattern = r'<div id="modal-donaciones"[^>]*>.*?</div>\s*</div>\s*</div>'
        
        # Reemplazar el modal
        new_content = re.sub(old_modal_pattern, modal, content, flags=re.DOTALL)
        
        # Agregar scripts si no están
        if 'donaciones.js' not in new_content:
            # Buscar el cierre de body y agregar scripts antes
            if '</body>' in new_content:
                # Verificar si ya hay scripts de PayPal
                if 'paypal.com/sdk' not in new_content:
                    new_content = new_content.replace('</body>', scripts + '\n</body>')
                else:
                    # Solo agregar donaciones.js si falta
                    if 'donaciones.js' not in new_content:
                        new_content = new_content.replace(
                            '<script src="',
                            '<script src="./build/js/donaciones.js"></script>\n    <script src="',
                            1
                        )
        
        # Guardar
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Actualizado: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Error en {filepath}: {e}")
        return False

# Archivos a actualizar
files_to_update = [
    ('galeria.html', False),
    ('proyectos.html', False),
    ('fundador.html', False),
    ('vicefundador.html', False),
    ('ejes.html', False),
    ('colaboradores.html', False),
    ('contactanos.html', False),
    ('en/galeria.html', True),
    ('en/proyectos.html', True),
    ('en/fundador.html', True),
    ('en/vicefundador.html', True),
    ('en/ejes.html', True),
    ('en/colaboradores.html', True),
    ('en/contactanos.html', True),
    ('en/index.html', True),
    ('en/nosotros.html', True),
]

if __name__ == '__main__':
    print("Actualizando modales de donaciones...\n")
    success = 0
    for filepath, is_en in files_to_update:
        if os.path.exists(filepath):
            if update_file(filepath, is_en):
                success += 1
        else:
            print(f"⚠ No encontrado: {filepath}")
    
    print(f"\n✓ {success}/{len(files_to_update)} archivos actualizados correctamente")

