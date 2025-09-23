// 휴대폰 번호 인증 모달 (임시)
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneVerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
  phoneNumber: string;
}

export default function PhoneVerificationModal({ 
  open, 
  onClose, 
  onVerified, 
  phoneNumber 
}: PhoneVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분

  const handleSendCode = () => {
    // TODO: 실제 인증코드 발송 API 호출
    console.log("인증코드 발송:", phoneNumber);
    alert("인증코드가 발송되었습니다. (임시: 123456)");
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    // TODO: 실제 인증 API 호출
    setTimeout(() => {
      if (verificationCode === "123456") {
        alert("인증이 완료되었습니다!");
        onVerified();
        onClose();
      } else {
        alert("인증코드가 올바르지 않습니다.");
      }
      setIsVerifying(false);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>휴대폰 번호 인증</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>휴대폰 번호</Label>
            <div className="flex gap-2">
              <Input 
                value={phoneNumber} 
                disabled 
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={handleSendCode}
                className="shrink-0"
              >
                인증코드 발송
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verificationCode">인증코드</Label>
            <div className="flex gap-2">
              <Input
                id="verificationCode"
                type="text"
                placeholder="인증코드 6자리 입력"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                className="flex-1"
              />
              <div className="text-sm text-muted-foreground self-center">
                {formatTime(timeLeft)}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              임시 인증코드: 123456
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isVerifying}
              className="flex-1"
            >
              {isVerifying ? "인증 중..." : "인증 확인"}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}