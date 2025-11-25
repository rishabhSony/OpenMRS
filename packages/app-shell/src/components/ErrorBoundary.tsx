import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '@openmrs-enterprise/ui-components';
import './ErrorBoundary.css';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(_error: Error): Partial<State> {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console (in production, send to error tracking service)
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        // TODO: Send to error tracking service (e.g., Sentry)
        // logErrorToService(error, errorInfo);
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        // Reload the page to reset the app state
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-icon">⚠️</div>
                        <h1>Oops! Something went wrong</h1>
                        <p className="error-message">
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </p>

                        <div className="error-actions">
                            <Button variant="primary" onClick={this.handleReset}>
                                Reload Application
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => window.history.back()}
                            >
                                Go Back
                            </Button>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Development Only)</summary>
                                <div className="error-stack">
                                    <h3>Error:</h3>
                                    <pre>{this.state.error.toString()}</pre>

                                    {this.state.errorInfo && (
                                        <>
                                            <h3>Component Stack:</h3>
                                            <pre>{this.state.errorInfo.componentStack}</pre>
                                        </>
                                    )}
                                </div>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
