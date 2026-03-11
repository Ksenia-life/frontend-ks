import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import image from './img/pam.jpg'

const fruits = [
  { id: 1, name: 'Яблоко', emoji: '🍎' },
  { id: 2, name: 'Банан', emoji: '🍌' },
  { id: 3, name: 'Апельсин', emoji: '🍊' },
]

export default function Description() {
  const [isEmojiVisible, setEmojiVisible] = useState(true)

  useEffect(() => {
    return () => {
      console.log('Description: unmount (размонтирование)')
    }
  }, [])

  return (
    <section>
      <h2 className="header">Description</h2>

      <ul>
        {fruits.map((item) => (
          <li key={item.id}>
            {isEmojiVisible ? item.emoji : null} {item.name}
          </li>
        ))}
      </ul>

      <button onClick={() => setEmojiVisible(false)}>Скрыть эмодзи</button>

      <p>Фон через background-image:</p>
      <div className={styles.picture}></div>

      <p>Картинка через img:</p>
      <img src={image} alt="City" width="220" style={{ borderRadius: 16 }} />
    </section>
  )
}
