import { useState } from "react";

export default function App() {
  const [inputs, setInputs] = useState({
    productCost: 2000,
    shipping: 500,
    ads: 300,
    tnFee: 3,
    paymentFee: 6,
    cuotasFee: 10,
    profitMargin: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const subtotal = inputs.productCost + inputs.shipping + inputs.ads;
  const priceWithoutIVA = subtotal / (1 - (inputs.tnFee + inputs.paymentFee + inputs.cuotasFee + inputs.profitMargin) / 100);
  const iva = priceWithoutIVA * 0.21;
  const finalPrice = priceWithoutIVA + iva;
  const netProfit = finalPrice - subtotal - (priceWithoutIVA * (inputs.tnFee + inputs.paymentFee + inputs.cuotasFee) / 100);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Calculadora de Costos de Venta</h1>

      {[
        ["Costo del producto", "productCost"],
        ["Packaging y envío", "shipping"],
        ["Publicidad por venta", "ads"],
        ["Comisión Tienda Nube (%)", "tnFee"],
        ["Comisión pasarela de pago (%)", "paymentFee"],
        ["Recargo cuotas sin interés (%)", "cuotasFee"],
        ["Margen de ganancia deseado (%)", "profitMargin"],
      ].map(([label, name]) => (
        <div key={name} style={{ marginBottom: 10 }}>
          <label>{label}</label>
          <input
            type="number"
            name={name}
            value={inputs[name]}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
      ))}

      <div style={{ marginTop: 20, background: "#eee", padding: 16 }}>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Precio sin IVA:</strong> ${priceWithoutIVA.toFixed(2)}</p>
        <p><strong>IVA (21%):</strong> ${iva.toFixed(2)}</p>
        <p><strong>Precio final con IVA:</strong> ${finalPrice.toFixed(2)}</p>
        <p><strong>Ganancia neta estimada:</strong> ${netProfit.toFixed(2)}</p>
      </div>
    </div>
  );
}
