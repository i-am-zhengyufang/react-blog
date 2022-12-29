import React from "react";
// 出错后显示的元素类型

type FallbackElement = React.ReactElement<
  unknown,
  string | React.FC | typeof React.Component
> | null;

// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  onError?: (error: Error, info: string) => void;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  render() {
    const { fallback } = this.props;
    const { error } = this.state;

    if (error !== null) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      throw new Error("ErrorBoundary 组件需要传入 fallback");
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
