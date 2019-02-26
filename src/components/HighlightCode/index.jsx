import React, { Component, useContext ,Fragment } from "react";
import AppContext from "../../config/Context";

import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import "./index.less";



const HighlightCode = () => {
  const { formattedGridColumn, formattedFactoryComp } = useContext(AppContext);

  return (
    <Fragment>
      <HighlightCodeComp codeStr={formattedGridColumn} lang="js" />
      <HighlightCodeComp codeStr={formattedFactoryComp} lang="jsx" />
    </Fragment>
    
  );
};



class HighlightCodeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { codeStr, lang } = this.props;
    return (
      <Highlight {...defaultProps} theme={theme} code={codeStr} language={lang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
}





export default HighlightCode;
