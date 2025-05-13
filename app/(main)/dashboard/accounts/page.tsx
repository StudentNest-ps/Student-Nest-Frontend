import type { Metadata } from 'next';
import { AccountsPageHeader } from './components/accounts-page-header';
import AccountCreationForm from './components/account-creation-form';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Create Accounts',
  description: 'Create owner and admin accounts for your application',
};

export default function AccountsPage() {
  return (
    <div className="flex  w-full flex-col">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <AccountsPageHeader />
        <AccountCreationForm />
      </div>
    </div>
  );
}
