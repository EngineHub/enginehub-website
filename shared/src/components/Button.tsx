import css from '@emotion/css';

export const MainButtonStyle = () => css`
    border: 1px solid #ccc;
    color: #333;
    text-shadow: 0 1px 0 #fff;
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
    background-image: linear-gradient(to bottom, #f5f5f5 0, #f1f1f1 100%);
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.7;
    border-radius: 4px;
    text-decoration: none;

    :hover {
        text-shadow: none;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
        border: 1px solid #c6c6c6;
        background-image: linear-gradient(to bottom, #f8f8f8 0, #f1f1f1 100%);
    }
`;

export const PurpleButtonStyle = () => css`
    border: 1px solid #412e61;
    color: #fff;
    text-shadow: 0 1px rgba(0, 0, 0, 0.1);
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
    background-image: linear-gradient(to bottom, #4d3672 0, #412e61 100%);
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.7;
    border-radius: 4px;
    text-decoration: none;

    :disabled {
        cursor: not-allowed;
        opacity: 0.7;
        background-image: linear-gradient(to bottom, #4d3672 0, #412e61 100%);

        :hover {
            background-image: linear-gradient(
                to bottom,
                #4d3672 0,
                #412e61 100%
            );
        }
    }

    :hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border: 1px solid #36264f;
        background-image: linear-gradient(to bottom, #4d3672 0, #36264f 100%);
    }
`;

export const BlueButtonStyle = () => css`
    border: 1px solid #00439e;
    color: #fff;
    text-shadow: 0 1px rgba(0, 0, 0, 0.1);
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
    background-image: linear-gradient(to bottom, #0059d1 0, #004eb8 100%);
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.7;
    border-radius: 4px;
    text-decoration: none;

    :hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border: 1px solid #00439e;
        background-image: linear-gradient(to bottom, #0059d1 0, #00439e 100%);
    }
`;
