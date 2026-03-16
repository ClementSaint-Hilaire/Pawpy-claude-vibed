import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import BackButton from '../../components/ui/BackButton'

const glassStyle =
  'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const glassAccentStyle =
  'bg-gradient-to-r from-brand/80 to-brand/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

function EyeClosedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 3L21 21M10.5 10.677C10.1906 11.0222 10 11.4901 10 12C10 13.1046 10.8954 14 12 14C12.5159 14 12.9834 13.8048 13.3294 13.4888M6.35955 6.5C4.34208 7.77128 2.71295 9.73918 2 12C3.27273 16.0588 7.27273 19 12 19C13.9347 19 15.7405 18.4815 17.2717 17.5804M9.76619 5.23456C10.4872 5.08085 11.2346 5 12 5C16.7273 5 20.7273 7.94118 22 12C21.6461 13.1256 21.0922 14.1601 20.3862 15.0596"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeOpenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12C3.27273 7.94118 7.27273 5 12 5C16.7273 5 20.7273 7.94118 22 12C20.7273 16.0588 16.7273 19 12 19C7.27273 19 3.27273 16.0588 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CornerArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type TransactionType = 'income' | 'expense'

interface Transaction {
  id: string
  name: string
  date: string
  amount: string
  type: TransactionType
}

const TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Stéphane Laplace', date: 'Validé le 26/08/2025', amount: '+ 60,43 €', type: 'income' },
  { id: '2', name: 'Marie Dupont', date: 'Validé le 24/08/2025', amount: '+ 45,00 €', type: 'income' },
  { id: '3', name: 'Thomas Bernard', date: 'Validé le 20/08/2025', amount: '+ 32,50 €', type: 'income' },
  { id: '4', name: 'Sophie Martin', date: 'Validé le 18/08/2025', amount: '- 15,00 €', type: 'expense' },
  { id: '5', name: 'Lucas Petit', date: 'Validé le 15/08/2025', amount: '+ 78,00 €', type: 'income' },
]

interface TransactionRowProps {
  transaction: Transaction
  hidden: boolean
}

function TransactionRow({ transaction, hidden }: TransactionRowProps) {
  return (
    <div className="flex gap-4 items-center h-[68px] border-t border-stroke/50">
      <div className="w-[54px] h-[54px] rounded-full bg-brand-light flex-shrink-0" />
      <div className="flex-1 flex flex-col justify-center gap-0.5 min-w-0">
        <p className="text-base font-medium text-text-primary leading-[1.2] truncate">
          {transaction.name}
        </p>
        <p className="text-sm font-normal text-text-secondary leading-[1.2] tracking-[-0.14px] truncate">
          {transaction.date}
        </p>
      </div>
      {hidden ? (
        <p className="text-base font-medium text-text-secondary leading-[1.2] flex-shrink-0">
          ••••
        </p>
      ) : (
        <p
          className={`text-base font-medium leading-[1.2] flex-shrink-0 ${
            transaction.type === 'income' ? 'text-[#34c759]' : 'text-text-secondary'
          }`}
        >
          {transaction.amount}
        </p>
      )}
    </div>
  )
}

export default function SitterProfilTransactions() {
  const navigate = useNavigate()
  const [hidden, setHidden] = useState(false)

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-16 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Transactions
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHidden((v) => !v)}
            className={`flex items-center justify-center p-3 rounded-full ${glassStyle}`}
          >
            <span className="text-text-primary">
              {hidden ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </span>
          </button>
          <button
            onClick={() => navigate('/sitter/profil/transactions/virement')}
            className={`flex items-center justify-center p-3 rounded-full ${glassAccentStyle}`}
          >
            <CornerArrowIcon />
          </button>
        </div>
      </div>

      {/* Balance */}
      <div className="flex items-center justify-center">
        <p className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          {hidden ? '••••••' : '50,00€'}
        </p>
      </div>

      {/* Transactions list */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-normal text-text-secondary leading-[1.2] tracking-[-0.14px]">
          Dernières transactions
        </p>
        <div className="flex flex-col">
          {TRANSACTIONS.map((t) => (
            <TransactionRow key={t.id} transaction={t} hidden={hidden} />
          ))}
        </div>
      </div>

      <BottomTabBar activeTab="profil" />
    </div>
  )
}
