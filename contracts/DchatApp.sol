// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DChatApp {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    // Mapping from user addresses to their messages with another user
    mapping(address => mapping(address => Message[])) private messages;

    event MessageSent(
        address indexed sender,
        address indexed receiver,
        string content,
        uint256 timestamp
    );

    // Function to send a message
    function sendMessage(address receiver, string calldata content) external {
        require(bytes(content).length > 0, "Message content cannot be empty");
        require(receiver != address(0), "Invalid receiver address");
        require(receiver != msg.sender, "Cannot send message to yourself");

        // Create a new message
        Message memory newMessage = Message({
            sender: msg.sender,
            receiver: receiver,
            content: content,
            timestamp: block.timestamp
        });

        // Store the message in the sender-receiver mapping
        messages[msg.sender][receiver].push(newMessage);
        messages[receiver][msg.sender].push(newMessage); // Store the message in the reverse mapping as well

        // Emit an event for the message sent
        emit MessageSent(msg.sender, receiver, content, block.timestamp);
    }

    // Function to get messages between the caller and a specified user
    function getMessagesWithUser(
        address user
    ) public view returns (Message[] memory) {
        // Retrieve messages sent from caller to user and from user to caller
        Message[] memory sentMessages = messages[msg.sender][user];
        Message[] memory receivedMessages = messages[user][msg.sender];

        // Combine both arrays
        Message[] memory allMessages = new Message[](
            sentMessages.length + receivedMessages.length
        );

        for (uint256 i = 0; i < sentMessages.length; i++) {
            allMessages[i] = sentMessages[i];
        }
        for (uint256 j = 0; j < receivedMessages.length; j++) {
            allMessages[sentMessages.length + j] = receivedMessages[j];
        }

        return allMessages;
    }
}
