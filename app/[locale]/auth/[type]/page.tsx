import AuthClient from './AuthClient';

export default function AuthPage({ params }: { params: { type: string; locale: string } }) {
  return <AuthClient type={params.type} locale={params.locale} />;
}
