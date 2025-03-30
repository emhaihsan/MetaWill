// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IMetaWillValidation {
    event ValidationRequested(
        address indexed validator,
        address indexed commitmentAddress
    );

    function registerValidationRequest(
        address validator,
        address commitmentAddress
    ) external;

    function getValidatorCommitments(
        address validator
    ) external view returns (address[] memory);

    function getValidatorCommitmentCount(
        address validator
    ) external view returns (uint256);
}
