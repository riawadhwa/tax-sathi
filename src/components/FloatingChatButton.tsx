import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const FloatingChatButton = () => {
    const handleClick = () => {
        window.open('https://manavilahoti.app.n8n.cloud/webhook/ba069b4c-61b9-4c32-b2e3-467986db92a4/chat', '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className="fixed bottom-6 right-6 rounded-full shadow-lg bg-taxBlue hover:bg-taxBlue/90 text-white px-6 py-6 flex items-center gap-2 z-50"
        >
            <MessageCircle className="h-5 w-5" />
            <span>Your Tax Assistant</span>
        </Button>
    );
};

export default FloatingChatButton; 