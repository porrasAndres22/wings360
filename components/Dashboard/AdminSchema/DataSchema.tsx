'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MoreVertical, Plus, Wallet, ArrowDownLeft, ArrowUpRight, CreditCard } from 'lucide-react';
import { ColorDealSchemaType as VariantType } from '@/interfaces'
import { colorDealSchema as variantStyles } from '@/global'

interface Transaction {
  name: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  variant: VariantType;
  balance: string;
  percentage: number;
  accountType: string;
}

interface CardData {
  balance: string;
  cardNumber: string;
  variant: VariantType;
  type: 'visa' | 'mastercard';
}

export default function FinancialDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');
  const [isHovered, setIsHovered] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<number>(5);
  
  const transactions: Transaction[] = [
    { 
      name: 'Jane Cooper', 
      date: '08 Sep, 2022', 
      amount: 1200, 
      type: 'income', 
      variant: 'emerald',
      balance: '$45,280.00',
      percentage: 15,
      accountType: 'Savings Account'
    },
    
  ];

  // Estado inicial basado en la última transacción (Jacob Jones - indigo)
  const [currentCardData, setCurrentCardData] = useState(transactions[1]);
  
  // Configuración de la tarjeta principal
  const cardVariant: VariantType = currentCardData.variant;
  const styles = variantStyles[cardVariant];
  const percentage = currentCardData.percentage;
  const dotCount = 10;
  const filledDots = Math.round((percentage / 100) * dotCount);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const handleTransactionClick = (index: number) => {
    setSelectedTransaction(index);
    setCurrentCardData(transactions[index]);
    setAnimatedPercentage(0); // Reset para la animación
  };

  const cardsData: CardData[] = [
    { balance: '$3,736', cardNumber: '7283 2323 7319 ****', variant: 'cyan', type: 'visa' },
    { balance: '$21,426', cardNumber: '3253 8243 1100 ****', variant: 'slate', type: 'mastercard' },
  ];

  const scheduledPayments = [
    { service: 'Discord', amount: 34.99, icon: '🎮' },
    { service: 'Walmart', amount: 14.99, icon: '🛒' },
    { service: 'Netflix', amount: 9.99, icon: '📺' },
  ];

  return (
    <div className="pt-4 md:pt-6 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Card Section - DINÁMICO - Cambia con cada transacción */}
            <div
              className={`${styles.card} rounded-3xl p-5 sm:p-6 md:p-5 lg:p-6 shadow-lg 
                transition-all duration-500 ease-out cursor-pointer
                hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
                ${isHovered ? "ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" : ""}
              `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 md:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`p-2 sm:p-2.5 rounded-xl ${styles.iconBg} transition-all duration-500
                      ${isHovered ? "rotate-12 scale-110" : ""}
                    `}
                  >
                    <span className={`${styles.iconColor} transition-all duration-300`}>
                      <Wallet className="w-5 h-5" />
                    </span>
                  </div>
                  <span
                    className={`font-semibold text-sm sm:text-base ${styles.text} transition-all duration-300
                      ${isHovered ? "tracking-wide" : ""}
                    `}
                  >
                    {currentCardData.accountType}
                  </span>
                </div>
                <button
                  className={`p-1.5 rounded-lg hover:bg-black/5 transition-all duration-300 ${styles.text}
                    ${isHovered ? "rotate-90" : ""}
                  `}
                  aria-label="More options"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>

              {/* Main Value - Balance dinámico */}
              <div className="mb-2 md:mb-1 overflow-hidden">
                <span
                  className={`text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold tracking-tight ${styles.text}
                    inline-block transition-all duration-500
                    ${isHovered ? "scale-105 translate-x-1" : ""}
                  `}
                >
                  {currentCardData.balance}
                </span>
              </div>

              {/* Transaction Info - Información dinámica */}
              <div className="mb-3">
                <p className={`text-sm ${styles.subtext}`}>
                  Last transaction: {currentCardData.name} • ${currentCardData.amount}
                </p>
              </div>

              {/* Percentage Badge - Porcentaje e icono dinámicos */}
              <div className="mb-4 md:mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold 
                    ${styles.percentage} transition-all duration-500
                    ${isHovered ? "scale-110 shadow-lg" : ""}
                  `}
                >
                  {currentCardData.type === 'income' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {animatedPercentage}%
                </span>
              </div>

              {/* Dot Progress Indicator - Puntos dinámicos según porcentaje */}
              <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-6">
                {Array.from({ length: dotCount }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 ${
                      index < filledDots ? styles.dotsfilled : styles.dotsempty
                    } ${isHovered ? "animate-bounce" : ""}`}
                    style={{
                      animationDelay: isHovered ? `${index * 50}ms` : "0ms",
                      animationDuration: "0.6s",
                      transform: isHovered && (index < filledDots) ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                ))}
              </div>

              {/* Action Buttons - Botones dinámicos según tipo */}
              <div className="flex gap-3">
                <button className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-md ${
                  currentCardData.type === 'income' 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                }`}>
                  💳 Deposit
                </button>
                <button className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  currentCardData.type === 'income'
                    ? 'bg-transparent border border-white/30 text-white hover:bg-white/10'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}>
                  💸 Withdraw
                </button>
              </div>
            </div>

            {/* Financial Record */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Financial Record</h2>
                <select 
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option>Month</option>
                  <option>Week</option>
                  <option>Year</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-gray-600">Total Income</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <svg className="w-full h-16" viewBox="0 0 100 40">
                      <path d="M 0 30 Q 20 25, 40 20 T 80 10 L 80 40 L 0 40 Z" fill="currentColor" className="text-green-200/50" />
                      <path d="M 0 30 Q 20 25, 40 20 T 80 10" stroke="currentColor" fill="none" strokeWidth="2" className="text-green-500" />
                    </svg>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-gray-900">$85,992</p>
                    <span className="text-green-600 text-sm flex items-center mb-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      17%
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-gray-600">Total Expense</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <svg className="w-full h-16" viewBox="0 0 100 40">
                      <path d="M 0 20 Q 20 15, 40 25 T 80 30 L 80 40 L 0 40 Z" fill="currentColor" className="text-orange-200/50" />
                      <path d="M 0 20 Q 20 15, 40 25 T 80 30" stroke="currentColor" fill="none" strokeWidth="2" className="text-orange-500" />
                    </svg>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-gray-900">$38,160</p>
                    <span className="text-orange-600 text-sm flex items-center mb-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      44%
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-gray-600">Total Saving</p>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-3">
                    <svg className="w-full h-16" viewBox="0 0 100 40">
                      <path d="M 0 25 Q 20 30, 40 20 T 80 15 L 80 40 L 0 40 Z" fill="currentColor" className="text-blue-200/50" />
                      <path d="M 0 25 Q 20 30, 40 20 T 80 15" stroke="currentColor" fill="none" strokeWidth="2" className="text-blue-500" />
                    </svg>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold text-gray-900">$47,832</p>
                    <span className="text-blue-600 text-sm flex items-center mb-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      45%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Money Flow Chart */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Money Flow</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    <span className="text-gray-600">Total Saving</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-600">Total Expense</span>
                  </div>
                  <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <div className="relative h-64">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  <line x1="0" y1="50" x2="800" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="150" x2="800" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                  <path d="M 50 120 Q 150 140, 250 110 T 450 120 T 650 100 T 750 110" stroke="#fb923c" fill="none" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 50 100 Q 150 80, 250 90 T 450 70 T 650 80 T 750 85" stroke="#1f2937" fill="none" strokeWidth="2.5" />
                  <circle cx="450" cy="70" r="6" fill="#1f2937" />
                  <rect x="420" y="40" width="60" height="24" rx="12" fill="#1f2937" />
                  <text x="450" y="56" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">$2289</text>
                  <text x="450" y="25" textAnchor="middle" fill="#6b7280" fontSize="10">07 Se, Th</text>
                </svg>
                <div className="flex justify-between text-xs text-gray-400 mt-2 px-8">
                  <span>04 Se, Mo</span>
                  <span>05 Se, Tu</span>
                  <span>06 Se, We</span>
                  <span>07 Se, Th</span>
                  <span>08 Se, Fr</span>
                  <span>09 Se, Sa</span>
                  <span>10 Se, Su</span>
                </div>
              </div>
            </div>

            {/* Send Money & Scheduled Payments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Send Money To</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">JD</div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">LA</div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">RF</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Scheduled Payments</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-6">
                  {scheduledPayments.map((payment, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-1">{payment.icon}</div>
                      <p className="text-xs text-gray-500 mb-1">{payment.service}</p>
                      <p className="text-sm font-semibold text-gray-900">${payment.amount}/m</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transactions INTERACTIVAS */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
                <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Month</option>
                  <option>Week</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {transactions.map((transaction, index) => {
                  const txStyles = variantStyles[transaction.variant];
                  const isHoveredTx = hoveredTransaction === index;
                  const isSelected = selectedTransaction === index;
                  
                  return (
                    <div
                      key={index}
                      className={`${txStyles.card} rounded-2xl p-4 shadow-lg 
                        transition-all duration-500 ease-out cursor-pointer
                        hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
                        ${isHoveredTx ? "ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" : ""}
                        ${isSelected ? "ring-4 ring-blue-400 ring-offset-2" : ""}
                      `}
                      onMouseEnter={() => setHoveredTransaction(index)}
                      onMouseLeave={() => setHoveredTransaction(null)}
                      onClick={() => handleTransactionClick(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl ${txStyles.iconBg} transition-all duration-500
                              ${isHoveredTx ? "rotate-12 scale-110" : ""}
                            `}
                          >
                            <span className={`${txStyles.iconColor} transition-all duration-300`}>
                              {transaction.type === 'income' ? 
                                <ArrowDownLeft className="w-4 h-4" /> : 
                                <ArrowUpRight className="w-4 h-4" />
                              }
                            </span>
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${txStyles.text} transition-all duration-300
                              ${isHoveredTx ? "tracking-wide" : ""}
                            `}>
                              {transaction.name}
                            </p>
                            <p className={`text-xs ${txStyles.subtext}`}>{transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${txStyles.text} transition-all duration-500
                            ${isHoveredTx ? "scale-110" : ""}
                          `}>
                            ${transaction.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Cards */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Available Card</h2>
                <button className="text-teal-600 text-sm font-medium hover:text-teal-700">View all</button>
              </div>
              
              <div className="space-y-4">
                {cardsData.map((card, index) => {
                  const cardStyles = variantStyles[card.variant];
                  const isHoveredCard = hoveredCard === index;
                  const cardDotCount = 8;
                  const cardPercentage = index === 0 ? 37 : 85;
                  const cardFilledDots = Math.round((cardPercentage / 100) * cardDotCount);
                  
                  return (
                    <div
                      key={index}
                      className={`${cardStyles.card} rounded-3xl p-5 shadow-lg 
                        transition-all duration-500 ease-out cursor-pointer
                        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
                        ${isHoveredCard ? "ring-2 ring-white/30 ring-offset-2 ring-offset-transparent" : ""}
                      `}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-xl ${cardStyles.iconBg} transition-all duration-500
                              ${isHoveredCard ? "rotate-12 scale-110" : ""}
                            `}
                          >
                            <span className={`${cardStyles.iconColor} transition-all duration-300`}>
                              <CreditCard className="w-4 h-4" />
                            </span>
                          </div>
                          <span className={`font-semibold text-xs ${cardStyles.text} uppercase transition-all duration-300
                            ${isHoveredCard ? "tracking-wider" : "tracking-wide"}
                          `}>
                            {card.type}
                          </span>
                        </div>
                        <button
                          className={`p-1 rounded-lg hover:bg-black/5 transition-all duration-300 ${cardStyles.text}
                            ${isHoveredCard ? "rotate-90" : ""}
                          `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </button>
                      </div>

                      <div className="mb-2 overflow-hidden">
                        <span
                          className={`text-3xl font-bold tracking-tight ${cardStyles.text}
                            inline-block transition-all duration-500
                            ${isHoveredCard ? "scale-105 translate-x-1" : ""}
                          `}
                        >
                          {card.balance}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold 
                            ${cardStyles.percentage} transition-all duration-500
                            ${isHoveredCard ? "scale-110 shadow-lg" : ""}
                          `}
                        >
                          {cardPercentage}% Active
                        </span>
                      </div>

                      <div className="flex gap-1.5 flex-wrap mb-4">
                        {Array.from({ length: cardDotCount }).map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-5 h-5 rounded-full transition-all duration-300 ${
                              dotIndex < cardFilledDots ? cardStyles.dotsfilled : cardStyles.dotsempty
                            } ${isHoveredCard ? "animate-bounce" : ""}`}
                            style={{
                              animationDelay: isHoveredCard ? `${dotIndex * 50}ms` : "0ms",
                              animationDuration: "0.6s",
                              transform: isHoveredCard && (dotIndex < cardFilledDots) ? "scale(1.1)" : "scale(1)",
                            }}
                          />
                        ))}
                      </div>

                      <div className="flex justify-between text-sm">
                        <div>
                          <p className={`${cardStyles.subtext} text-xs mb-1 opacity-70`}>Card Number</p>
                          <p className={`font-medium ${cardStyles.text}`}>{card.cardNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className={`${cardStyles.subtext} text-xs mb-1 opacity-70`}>Exp</p>
                          <p className={`font-medium ${cardStyles.text}`}>**/**</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}