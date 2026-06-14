type LabelValueProps = {
  label: string;
  children: React.ReactNode;
};

export function LabelValue({ label, children }: LabelValueProps) {
  return (
    <dl>
      <dt className="font-bold">{label}:</dt>
      <dd className="text-sm text-gray-600">{children}</dd>
    </dl>
  );
}
