import { useState } from 'react'

const parts = [
  {
    sku: "K50-RL-2-15Х11МФ",
    name: "Рабочая лопатка 2 ступени",
    turbine: "К-50",
    material: "15Х11МФ",
    length: "134 мм",
    stock: 4,
    location: "Москва"
  },
  {
    sku: "T100-NL-1-12Х13",
    name: "Направляющая лопатка 1 ступени",
    turbine: "Т-100",
    material: "12Х13",
    length: "122 мм",
    stock: 2,
    location: "Екатеринбург"
  }
];

export default function App() {
  const [filter, setFilter] = useState('');
  const [chat, setChat] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const filteredParts = parts.filter(p =>
    !filter || p.turbine === filter
  );

  const askAI = () => {
    const text = chat.toLowerCase();
    if (text.includes('лопатка') && text.includes('к-50')) {
      setAiResponse('Подходит SKU: K50-RL-2-15Х11МФ (Рабочая лопатка 2 ступени, 134 мм, ГОСТ 26004-83). В наличии 4 шт. в Москве.');
    } else {
      setAiResponse('Пожалуйста, уточните модель турбины, ступень и материал.');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Каталог запчастей для турбин + AI-ассистент</h1>

      <label>Тип турбины:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: '1rem' }}>
        <option value=''>Все</option>
        <option value='К-50'>К-50</option>
        <option value='Т-100'>Т-100</option>
      </select>

      {filteredParts.map((p) => (
        <div key={p.sku} style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12, marginBottom: 12 }}>
          <strong>{p.name}</strong><br />
          SKU: {p.sku}<br />
          Материал: {p.material}<br />
          Длина: {p.length}<br />
          В наличии: {p.stock} шт. ({p.location})<br />
          <button style={{ marginTop: 8 }}>Оформить заявку</button>
        </div>
      ))}

      <div style={{ background: '#f9f9f9', padding: 16, borderRadius: 6, marginTop: 32 }}>
        <h2>💬 AI-ассистент</h2>
        <textarea value={chat} onChange={(e) => setChat(e.target.value)} style={{ width: '100%', height: 80 }} />
        <button onClick={askAI} style={{ marginTop: 8 }}>Подобрать</button>
        <div style={{ marginTop: 12, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{aiResponse}</div>
      </div>
    </div>
  );
}
