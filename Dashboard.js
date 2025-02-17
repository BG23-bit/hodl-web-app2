import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const Dashboard = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [btcHoldings, setBtcHoldings] = useState(0.21); // Example holding
  const [loanBalance, setLoanBalance] = useState(50000); // Example loan balance in AUD
  const [nextPayment, setNextPayment] = useState({ amount: 1658.33, date: '2025-03-01' });

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=aud');
        setBtcPrice(response.data.bitcoin.aud);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchBtcPrice();
  }, []);

  const btcValueInAud = btcPrice ? (btcHoldings * btcPrice).toFixed(2) : 'Loading...';

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold mb-4">Hodl Loan Dashboard</h1>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">BTC Price (AUD):</h2>
          <p className="text-lg">{btcPrice ? `$${btcPrice}` : 'Loading...'}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Your BTC Holdings:</h2>
          <p className="text-lg">{btcHoldings} BTC (~${btcValueInAud} AUD)</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Current Loan Balance:</h2>
          <p className="text-lg">${loanBalance.toLocaleString()} AUD</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Next Monthly Repayment:</h2>
          <p className="text-lg">${nextPayment.amount} AUD due on {nextPayment.date}</p>
        </CardContent>
      </Card>
      <Button className="w-full mt-4">Make a Payment</Button>
    </div>
  );
};

export default Dashboard;
