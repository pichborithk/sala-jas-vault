const EmptyState = ({ icon = "◈", message }: {
  icon?: string;
  message: string
}) => (
  <div
    className="flex flex-col items-center justify-center py-20 text-stone-600">
    <div className="mb-4 text-4xl opacity-40">{icon}</div>
    <p className="text-sm">{message}</p>
  </div>
)

export default EmptyState