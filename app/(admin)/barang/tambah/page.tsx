import TambahBarangForm from "./form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TambahBarangPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tambah Barang
        </h1>
        <p className="text-muted-foreground">
          Tambahkan barang baru ke sistem inventaris.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informasi Barang</CardTitle>
          <CardDescription>
            Lengkapi data barang di bawah ini.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TambahBarangForm />
        </CardContent>
      </Card>
    </div>
  );
}