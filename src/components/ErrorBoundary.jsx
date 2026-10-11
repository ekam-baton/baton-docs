import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          minHeight: '100vh',
          background: '#070a14',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#60a5fa' }}>
            Interactive Experience Recovered
          </h2>
          <p style={{ maxWidth: '500px', color: '#a1a1aa', marginBottom: '2rem' }}>
            {this.state.error?.message || 'A visual display issue occurred. Refreshing will restore the view.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reload Experience
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
