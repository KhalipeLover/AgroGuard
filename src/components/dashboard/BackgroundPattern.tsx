/**
 * BackgroundPattern Component
 * 
 * Reusable animated background pattern with blob animations
 * Used in both UserDashboard and AdminDashboard
 */

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 opacity-30 dark:opacity-40 pointer-events-none">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B945E] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0077B6] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000" />
    </div>
  );
}
