import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Homepage } from './pages/Homepage.jsx';
import { Catalog } from './pages/Catalog.jsx';
import { Quote } from './pages/Quote.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Cart } from './pages/Cart.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { OrderSuccess } from './pages/OrderSuccess.jsx';
import { TrackOrder } from './pages/TrackOrder.jsx';
import { About } from './pages/About.jsx';
import { Contact } from './pages/Contact.jsx';
import { Support } from './pages/Support.jsx';
import { Locations } from './pages/Locations.jsx';
import { Blog } from './pages/Blog.jsx';
import { BlogPost } from './pages/BlogPost.jsx';
import { Resources } from './pages/Resources.jsx';
import { Services } from './pages/Services.jsx';
import { ServiceDistribution } from './pages/ServiceDistribution.jsx';
import { ServicePDAC } from './pages/ServicePDAC.jsx';
import { ServiceDealer } from './pages/ServiceDealer.jsx';
import { ServiceEducation } from './pages/ServiceEducation.jsx';
import { SegmentASC } from './pages/segments/SegmentASC.jsx';
import { SegmentGov } from './pages/segments/SegmentGov.jsx';
import { SegmentPharmacy } from './pages/segments/SegmentPharmacy.jsx';
import { SegmentEMS } from './pages/segments/SegmentEMS.jsx';
import { SegmentDealers } from './pages/segments/SegmentDealers.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { AccountSettings } from './pages/AccountSettings.jsx';
import { Invoices } from './pages/Invoices.jsx';
import { AdminOverview } from './pages/admin/AdminOverview.jsx';
import { AdminAnalytics } from './pages/admin/AdminAnalytics.jsx';
import { AdminInventory } from './pages/admin/AdminInventory.jsx';
import { AdminCRM } from './pages/admin/AdminCRM.jsx';
import { AdminOrders } from './pages/admin/AdminOrders.jsx';
import { AdminCMS } from './pages/admin/AdminCMS.jsx';
import { AdminVendorApproval } from './pages/admin/AdminVendorApproval.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Shopping flow */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id/confirmed" element={<OrderSuccess />} />
        <Route path="/orders/:id/track" element={<TrackOrder />} />

        {/* Brand / about */}
        <Route path="/about" element={<About />} />

        {/* Marketing */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resources" element={<Resources />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/distribution" element={<ServiceDistribution />} />
        <Route path="/services/pdac" element={<ServicePDAC />} />
        <Route path="/services/dealer" element={<ServiceDealer />} />
        <Route path="/services/education" element={<ServiceEducation />} />

        {/* Segments */}
        <Route path="/segments/asc" element={<SegmentASC />} />
        <Route path="/segments/gov" element={<SegmentGov />} />
        <Route path="/segments/pharmacy" element={<SegmentPharmacy />} />
        <Route path="/segments/ems" element={<SegmentEMS />} />
        <Route path="/segments/distributors" element={<SegmentDealers />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Account */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account/settings" element={<AccountSettings />} />
        <Route path="/account/invoices" element={<Invoices />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/crm" element={<AdminCRM />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/cms" element={<AdminCMS />} />
        <Route path="/admin/vendors" element={<AdminVendorApproval />} />
      </Routes>
    </BrowserRouter>
  );
}
