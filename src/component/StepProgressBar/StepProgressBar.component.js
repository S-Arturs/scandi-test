/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import { PureComponent } from "react";

import "./StepProgressBar.style";

/** @namespace Component/StepProgressBar/Component */
export class StepProgressBar extends PureComponent {

  renderProgressBar() {
    const { checkoutStep, stepMap } = this.props;
    let currentIndex = -1;
    let length = 0;
    Object.keys(stepMap).map(() => length++);
    return (
      <div className="StepProgressBar">
        {Object.keys(stepMap).map((key, index) => {
          if (key === checkoutStep) {
            currentIndex = index;
          }
          return this.renderProgressLineAndPoint(
            key,
            index,
            currentIndex,
            length
          );
        })}
      </div>
    );
  }

  renderProgressLineAndPoint(key, index, currentIndex, length) {
    let isCompleted = false;
    if (index <= currentIndex || currentIndex === -1) {
      isCompleted = true;
    }
    if (index + 1 === length)
      return (
        <div className="FlexWrapperEdge">{this.renderProgressLine(isCompleted)}</div>
      );
    if (index === 0)
      return (
        [<div className="FlexWrapperEdge">{this.renderProgressLine(isCompleted)}</div>,
        <div>
        {this.renderProgressPoint(
          key,
          index,
          currentIndex,
          length,
          isCompleted
        )}
      </div>]
    );
    return [
      <div className="FlexWrapper">{this.renderProgressLine(isCompleted)}</div>,
      <div>
        {this.renderProgressPoint(
          key,
          index,
          currentIndex,
          length,
          isCompleted
        )}
      </div>,
    ];
  }
  renderProgressLine(isCompleted) {
    let className = "ProgressLine";
    if (isCompleted) {
      className = "ProgressLine Completed";
    }
    return (
      <div className="Line">
        <div className={className}></div>
      </div>
    );
  }
  renderProgressPoint(key, index, currentIndex, length, isCompleted) {
    const { stepMap } = this.props
    let text = index + 1;
    let className = "Circle";
    if (index + 1 === length) return null;
    if (index < currentIndex || currentIndex === -1) {
      text = "✓";
    }
    if (isCompleted) {
      className = "Circle Completed";
    }
    var lastIndex = stepMap[key].title.toString().lastIndexOf(" ");
    let string = stepMap[key].title.toString().substring(0, lastIndex);
    return (
      <div className="PointWrapper">
        <div className={className}>{text}</div>
        <div className="PointTextWrapper">
          {string}
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderProgressBar()}</div>;
  }
}

export default StepProgressBar;
