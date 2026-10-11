/** Email address with a soft line-break opportunity after the @. */
export default function Email({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  if (domain === undefined) return <>{email}</>;
  return (
    <>
      {user}@<wbr />
      {domain}
    </>
  );
}
