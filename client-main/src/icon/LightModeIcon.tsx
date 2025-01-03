import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const LightModeIcon = (
  props: Partial<CustomIconComponentProps & { onClick: () => void }>
) => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="256"
        height="256"
        viewBox="0 0 256 256"
      >
        <defs></defs>
        <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path
            d="M 45 11.861 c 2.927 0 5.764 0.383 8.467 1.096 C 51.156 7.54 48.279 3.09 45 0 c -3.279 3.09 -6.156 7.54 -8.467 12.957 C 39.236 12.245 42.073 11.861 45 11.861 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 73.641 28.339 c 2.199 -5.468 3.312 -10.652 3.178 -15.159 c -4.506 -0.133 -9.691 0.979 -15.159 3.179 C 66.617 19.248 70.752 23.383 73.641 28.339 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 28.339 16.359 c -5.468 -2.199 -10.652 -3.312 -15.159 -3.178 c -0.133 4.506 0.979 9.691 3.178 15.159 C 19.248 23.383 23.383 19.248 28.339 16.359 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 90 45 c -3.09 -3.279 -7.54 -6.156 -12.957 -8.467 c 0.713 2.703 1.096 5.54 1.096 8.467 s -0.383 5.764 -1.096 8.467 C 82.46 51.156 86.91 48.279 90 45 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 11.861 45 c 0 -2.927 0.383 -5.764 1.096 -8.467 C 7.54 38.844 3.09 41.721 0 45 c 3.09 3.279 7.54 6.156 12.957 8.467 C 12.245 50.764 11.861 47.927 11.861 45 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 61.661 73.641 c 5.468 2.199 10.652 3.312 15.159 3.178 c 0.133 -4.506 -0.979 -9.691 -3.178 -15.159 C 70.752 66.617 66.617 70.752 61.661 73.641 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 78.139 c -2.927 0 -5.764 -0.383 -8.467 -1.096 C 38.844 82.46 41.721 86.91 45 90 c 3.279 -3.09 6.156 -7.54 8.467 -12.957 C 50.764 77.755 47.927 78.139 45 78.139 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 16.359 61.661 c -2.199 5.468 -3.312 10.652 -3.178 15.159 c 4.506 0.133 9.691 -0.979 15.159 -3.178 C 23.383 70.752 19.248 66.617 16.359 61.661 z"
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <circle cx="45" cy="45" r="27" transform="  matrix(1 0 0 1 0 0) " />
        </g>
      </svg>
    )}
    {...props}
  />
);

export default LightModeIcon;
