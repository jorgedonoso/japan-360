type FieldProps = {
  label: string;
  children: React.ReactNode;
};

export function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="font-bold">{label}:</label>
      {children}
    </div>
  );
}
