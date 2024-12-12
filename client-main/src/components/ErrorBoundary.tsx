import { Component, ErrorInfo, ReactNode } from "react";
import ErrorFallblack from "./ErrorFallblack";

interface Props {
  children?: ReactNode;
  navigate?: (route: string) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Uncaught error:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallblack />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
