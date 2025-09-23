import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminNoticeManagement() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "서버 업데이트 안내",
      content: "안정적인 서비스 제공을 위해 서버 업데이트를 진행합니다.",
      author: "관리자",
      createdAt: "2025-09-08",
      status: "공개",
      priority: "high"
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    priority: "normal"
  });

  const handleCreateNotice = () => {
    const notice = {
      id: notices.length + 1,
      ...newNotice,
      author: "관리자",
      createdAt: new Date().toISOString().split('T')[0],
      status: "공개"
    };
    setNotices([...notices, notice]);
    setNewNotice({ title: "", content: "", priority: "normal" });
    setIsCreateModalOpen(false);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">중요</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">보통</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">일반</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "공개":
        return <Badge className="bg-green-100 text-green-800">공개</Badge>;
      case "비공개":
        return <Badge className="bg-gray-100 text-gray-800">비공개</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>공지 사항 관리</CardTitle>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                새 공지사항
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 공지사항 작성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">제목</label>
                  <Input
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="공지사항 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">내용</label>
                  <Textarea
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    placeholder="공지사항 내용을 입력하세요"
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">우선순위</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="normal">일반</option>
                    <option value="medium">보통</option>
                    <option value="high">중요</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleCreateNotice}>
                    작성완료
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            공지사항을 등록하여 관리할 수 있습니다.
          </p>
        </CardContent>
      </Card>

      {/* 공지사항 목록 */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>번호</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead>관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>{notice.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{notice.title}</span>
                      {getPriorityBadge(notice.priority)}
                      {getStatusBadge(notice.status)}
                    </div>
                  </TableCell>
                  <TableCell>{notice.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              <Button variant="outline" size="sm">이전</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">다음</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}