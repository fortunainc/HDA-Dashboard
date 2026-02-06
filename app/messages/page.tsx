'use client'

import DashboardLayout from '../../components/DashboardLayout'
import { Send, Search, Paperclip, MoreVertical } from 'lucide-react'
import { useState } from 'react'

const conversations = [
  { id: 1, name: 'John Smith', company: 'Acme Corporation', lastMessage: 'Thanks for the proposal, looks great!', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Sarah Johnson', company: 'Global Solutions', lastMessage: 'Can we schedule a call for next week?', time: '9:15 AM', unread: 0 },
  { id: 3, name: 'Mike Chen', company: 'Innovate Labs', lastMessage: 'I have a few questions about the pricing', time: 'Yesterday', unread: 1 },
  { id: 4, name: 'Emily Davis', company: 'Smart Finance', lastMessage: 'Looking forward to working together', time: 'Yesterday', unread: 0 },
  { id: 5, name: 'David Wilson', company: 'Tech Startups Inc', lastMessage: 'Sent over the requirements', time: 'Jan 15', unread: 0 },
]

const messages = [
  { id: 1, sender: 'them', text: 'Hi! I saw your presentation and I\'m interested in learning more.', time: '9:00 AM' },
  { id: 2, sender: 'me', text: 'Thanks for reaching out! I\'d be happy to discuss how we can help your business.', time: '9:15 AM' },
  { id: 3, sender: 'them', text: 'Great! What services do you offer for lead generation?', time: '9:20 AM' },
  { id: 4, sender: 'me', text: 'We offer AI-powered lead generation that can help you find and qualify leads automatically. We typically see a 3-5x increase in qualified leads for our clients.', time: '9:30 AM' },
  { id: 5, sender: 'them', text: 'That sounds impressive! Can we schedule a call to discuss pricing?', time: '10:00 AM' },
  { id: 6, sender: 'me', text: 'Absolutely! I have availability tomorrow at 2pm or Thursday at 10am. Which works better for you?', time: '10:05 AM' },
  { id: 7, sender: 'them', text: 'Tomorrow at 2pm works perfect. Thanks!', time: '10:10 AM' },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with your leads and clients</p>
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(600px-73px)]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                            <span className="text-xs text-gray-500 ml-2">{conversation.time}</span>
                          </div>
                          <p className="text-xs text-gray-500">{conversation.company}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                        </div>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message View */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                    {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">{selectedConversation.company}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'me'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        setNewMessage('')
                      }
                    }}
                  />
                  <button className="btn btn-primary flex items-center gap-2">
                    <Send size={20} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}