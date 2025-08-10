import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    properties: [],
    totalValue: 0,
    recentListings: [],
    analytics: {},
    loading: true
  });

  // Enhanced property data matching your existing structure
  const sampleProperties = [
    {
      id: 1,
      title: "3 BHK Flat for Sale in Salt Lake, Kolkata",
      area: "1200 sqft",
      price: 8500000,
      pricePerSqft: 7083,
      floor: "4 out of 8",
      status: "Ready to Move",
      owner: "Rajesh Kumar",
      imageCount: 22,
      bathroom: 2,
      furnishing: "Fully-Furnished",
      location: "Salt Lake",
      imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/howrah-bridge-howrah-west-bengal-city-1-hero?qlt=82&ts=1742154305591",
      listed: "2024-08-05",
      leads: 15,
      views: 340
    },
    {
      id: 2,
      title: "2 BHK Flat for Sale in Howrah Station Area",
      area: "850 sqft",
      price: 4200000,
      pricePerSqft: 4941,
      floor: "2 out of 5",
      status: "Under Construction",
      owner: "Priya Banerjee",
      imageCount: 18,
      bathroom: 2,
      furnishing: "Semi-Furnished",
      location: "Howrah",
      imageUrl: "https://st2.indiarailinfo.com/kjfdsuiemjvcya4/0/0/2/7/4226027/0/201902101933193810988.jpg",
      listed: "2024-08-08",
      leads: 8,
      views: 156
    },
    {
      id: 3,
      title: "1 BHK Studio Flat in Dum Dum Metro Area",
      area: "600 sqft",
      price: 3200000,
      pricePerSqft: 5333,
      floor: "6 out of 10",
      status: "Ready to Move",
      owner: "Amit Ghosh",
      imageCount: 15,
      bathroom: 1,
      furnishing: "Unfurnished",
      location: "Dumdum",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQjr5JkOfSE6vmq2NuBbSIAPz5VOPKOKvPQ&s",
      listed: "2024-08-10",
      leads: 12,
      views: 289
    },
    {
      id: 4,
      title: "4 BHK Luxury Flat in New Town, Kolkata",
      area: "1800 sqft",
      price: 12000000,
      pricePerSqft: 6667,
      floor: "12 out of 15",
      status: "Ready to Move",
      owner: "Sunita Das",
      imageCount: 28,
      bathroom: 3,
      furnishing: "Fully-Furnished",
      location: "New Town",
      imageUrl: "https://i.ytimg.com/vi/oGSYQusieNM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDtuYXWBz-0Se5F6fK_D4He4VXyHA",
      listed: "2024-07-28",
      leads: 25,
      views: 567
    }
  ];

  const areas = [
    { name: "Kolkata", count: 45, avgPrice: 6500000, growth: "+12%" },
    { name: "Howrah", count: 28, avgPrice: 4200000, growth: "+8%" },
    { name: "Dumdum", count: 22, avgPrice: 3800000, growth: "+15%" },
    { name: "Salt Lake", count: 35, avgPrice: 7200000, growth: "+10%" },
    { name: "New Town", count: 18, avgPrice: 9500000, growth: "+18%" }
  ];

  const recentActivities = [
    { type: "New Listing", message: "3 BHK in Salt Lake added", time: "2 hours ago", status: "success" },
    { type: "Sale Completed", message: "2 BHK in Howrah sold for ₹42L", time: "5 hours ago", status: "sold" },
    { type: "New Inquiry", message: "Inquiry for 4 BHK in New Town", time: "1 day ago", status: "inquiry" },
    { type: "Price Updated", message: "1 BHK in Dumdum price reduced", time: "2 days ago", status: "update" }
  ];

  useEffect(() => {
    // Simulate API call - replace with your actual API endpoint
    const loadDashboardData = async () => {
      try {
        // You can replace this with actual API calls to your backend
        // const response = await axios.get('http://localhost:6005/api/dashboard');
        
        // Simulated data calculation
        const totalValue = sampleProperties.reduce((sum, prop) => sum + prop.price, 0);
        const totalViews = sampleProperties.reduce((sum, prop) => sum + prop.views, 0);
        const totalLeads = sampleProperties.reduce((sum, prop) => sum + prop.leads, 0);
        
        setDashboardData({
          properties: sampleProperties,
          totalValue,
          totalViews,
          totalLeads,
          recentListings: sampleProperties.slice(0, 3),
          analytics: {
            totalProperties: sampleProperties.length,
            avgPricePerSqft: Math.round(totalValue / sampleProperties.reduce((sum, prop) => sum + parseInt(prop.area), 0)),
            conversionRate: "23%"
          },
          loading: false
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setDashboardData(prev => ({ ...prev, loading: false }));
      }
    };

    loadDashboardData();
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatNumber = (num) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    }
    return num.toLocaleString();
  };

  if (dashboardData.loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Real Estate Dashboard</h1>
        <p>Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card total-value">
          <div className="kpi-icon">🏠</div>
          <div className="kpi-content">
            <h3>Total Portfolio Value</h3>
            <p className="kpi-number">{formatPrice(dashboardData.totalValue)}</p>
            <span className="kpi-growth">+12% from last month</span>
          </div>
        </div>

        <div className="kpi-card properties">
          <div className="kpi-icon">📊</div>
          <div className="kpi-content">
            <h3>Active Properties</h3>
            <p className="kpi-number">{dashboardData.analytics.totalProperties}</p>
            <span className="kpi-growth">4 new this week</span>
          </div>
        </div>

        <div className="kpi-card leads">
          <div className="kpi-icon">👥</div>
          <div className="kpi-content">
            <h3>Total Leads</h3>
            <p className="kpi-number">{dashboardData.totalLeads}</p>
            <span className="kpi-growth">Conversion: {dashboardData.analytics.conversionRate}</span>
          </div>
        </div>

        <div className="kpi-card views">
          <div className="kpi-icon">👁️</div>
          <div className="kpi-content">
            <h3>Total Views</h3>
            <p className="kpi-number">{formatNumber(dashboardData.totalViews)}</p>
            <span className="kpi-growth">+25% this month</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Properties */}
        <div className="dashboard-section recent-properties">
          <h2>Recent Listings</h2>
          <div className="property-list">
            {dashboardData.recentListings.map((property) => (
              <div key={property.id} className="mini-property-card">
                <img 
                  src={property.imageUrl} 
                  alt={property.title}
                  className="mini-property-image"
                />
                <div className="mini-property-details">
                  <h4>{property.title}</h4>
                  <p className="property-area">{property.area} • {property.location}</p>
                  <p className="property-price">{formatPrice(property.price)}</p>
                  <div className="property-stats">
                    <span>👁️ {property.views}</span>
                    <span>📞 {property.leads}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area Performance */}
        <div className="dashboard-section area-performance">
          <h2>Area Performance</h2>
          <div className="area-list">
            {areas.map((area, index) => (
              <div key={index} className="area-item">
                <div className="area-info">
                  <h4>{area.name}</h4>
                  <p>{area.count} properties</p>
                  <p className="area-price">Avg: {formatPrice(area.avgPrice)}</p>
                </div>
                <div className="area-growth">
                  <span className={`growth ${area.growth.includes('+') ? 'positive' : 'negative'}`}>
                    {area.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-section recent-activities">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`activity-item ${activity.status}`}>
                <div className="activity-icon">
                  {activity.status === 'success' && '✅'}
                  {activity.status === 'sold' && '💰'}
                  {activity.status === 'inquiry' && '📞'}
                  {activity.status === 'update' && '📝'}
                </div>
                <div className="activity-content">
                  <h4>{activity.type}</h4>
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button 
              className="action-btn primary"
              onClick={() => navigate('/sell')}
            >
              <span>➕</span>
              Add New Property
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => navigate('/view')}
            >
              <span>👁️</span>
              View All Properties
            </button>
            <button 
              className="action-btn tertiary"
              onClick={() => window.location.reload()}
            >
              <span>🔄</span>
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="market-insights">
        <h2>Market Insights - Kolkata Real Estate</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>🏆 Top Performing Area</h3>
            <p><strong>New Town</strong> with +18% growth</p>
          </div>
          <div className="insight-card">
            <h3>📈 Average Price/SqFt</h3>
            <p><strong>₹{dashboardData.analytics.avgPricePerSqft}</strong> across all areas</p>
          </div>
          <div className="insight-card">
            <h3>🎯 Best ROI</h3>
            <p><strong>Salt Lake</strong> properties showing strong demand</p>
          </div>
          <div className="insight-card">
            <h3>💡 Market Trend</h3>
            <p><strong>2-3 BHK</strong> flats in high demand</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;