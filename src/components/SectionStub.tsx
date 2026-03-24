// Универсальная заглушка для разделов меню, которые пока не реализованы.
// Позволяет быстро добавить временную страницу без дублирования разметки.
type SectionStubProps = {
  title: string
  description: string
}

// Переиспользуемый UI-блок с заголовком, описанием и пометкой "скоро будет доступно".
function SectionStub({ title, description }: SectionStubProps) {
  return (
    <section className="stub-page" aria-label={`${title} page placeholder`}>
      <p className="stub-badge">Coming soon</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default SectionStub
