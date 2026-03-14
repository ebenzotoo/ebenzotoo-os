"use client";

export default function DeleteButton({
  action,
  confirm: confirmMsg = "Are you sure?",
}: {
  action: () => Promise<void>;
  confirm?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmMsg)) e.preventDefault();
      }}
      className="inline"
    >
      <button
        type="submit"
        className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
